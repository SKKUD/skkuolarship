from abc import abstractmethod, ABC
from logging import getLogger

from bs4 import BeautifulSoup
from requests import Response
from network.request import CrawlerRequests


class LoginError(Exception):
    pass


class LoginInfoInvalid(Exception):
    pass


class AuthInfoRequired(Exception):
    pass


class ParsingFailed(Exception):
    pass


class AbstractArticleCrawler(ABC):
    target_type = -1
    except_keyword_list = ["결과", "[행사/세미나]", "[학사]", "[입학]", "[취업]", "[채용모집]", "[일반]", "[수강증원]"]

    def __init__(self, url=None, requests: CrawlerRequests = None, **options):
        self.url = url
        self.options = options
        self.requests = requests or CrawlerRequests()
        self.logger = getLogger(__name__)

    def do_request(self, func=None, url=None, **extra_info) -> Response:
        """
        정보를 받아 정상적인 Response를 반환하는 함수.
        :param func: 사용할 메서드
        :param url: URL
        :param extra_info: 이외 추가정보.
        :return: 정상적인 응답.
        """
        func = func or self.requests.get
        assert url is not None

        # execute request.
        response = func(url, **extra_info)

        # check response is valid.
        if self.check_perm(response):
            return response

        # if not, try to login
        try:
            if not self.get_auth():
                raise AuthInfoRequired()
        except Exception as error:
            raise LoginError(error)

        # retry to execute request.
        response = func(url, **extra_info)

        # check response is valid.
        if self.check_perm(response):
            return response

        # invalid permission
        raise LoginInfoInvalid()

    def check_perm(self, response: Response) -> bool:
        """
        Response가 정상적으로 받아 왔는지 체크.
        :param response: 정상인지 정상이 아닌지 확인할 response.
        :return: 정상이면 True, 비정상이면 False
        """
        return True

    def get_auth(self):
        return None

    def crawl(self):
        """
        override this method if request is not normal http get.
        :return: lists contains publishable model.
        """
        response = self.do_request(url=self.url)
        result = self.parse_response(response)
        return result

    @staticmethod
    def _parse_html(html, parser='html.parser'):
        return BeautifulSoup(html, parser)

    @abstractmethod
    def parse_response(self, response: Response) -> list:
        pass  # abstract method
