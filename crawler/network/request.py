from logging import getLogger

import requests
from requests.exceptions import *

from network.session import SessionInfo

USER_AGENT_LIST = {
    "DEFAULT_USER_AGENT": "Mozilla/5.0` (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36",
    "USER_AGENT_MAC_CHROME_69": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.92 Safari/537.36",
    "USER_AGENT_MAC_CHROME_76": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.3"}


class CrawlerRequests:
    def __init__(self, user_agent=USER_AGENT_LIST['DEFAULT_USER_AGENT']) -> None:
        super().__init__()
        self.logger = getLogger(__name__)
        self.session = self.generate_session()
        if user_agent:
            self.set_user_agent(user_agent)

    def set_user_agent(self, user_agent):
        if not user_agent:
            if self.session.headers.get('User-Agent'):
                del self.session.headers['User-Agent']
            return
        self.session.headers['User-Agent'] = user_agent

    @property
    def session_info(self):
        return SessionInfo.from_session(self.session)

    def get(self, url, params=None, **kwargs):
        return self.common_exception_trap('get', lambda: self.session.get(url, params=params, **kwargs))

    def post(self, url, data=None, json=None, **kwargs):
        return self.common_exception_trap('post', lambda: self.session.post(url, data, json, **kwargs))

    def put(self, url, data=None, **kwargs):
        return self.common_exception_trap('put', lambda: self.session.put(url, data, **kwargs))

    def set_session_info(self, session_info: SessionInfo):
        session_info.apply_to_session(self.session)

    def common_exception_trap(self, method, func):
        total_time = 0
        content_length = 0
        response_code = -1
        url = None
        try:
            result = func.__call__()
            total_time = result.elapsed.total_seconds()
            response_code = result.status_code
            content_length = result.headers.get('Content-Length', len(result.content))
            url = result.request.url
            return result
        except RequestException as error:
            self.logger.error("[{}] {}".format(str(error.__class__.__name__), error))
            url = error.request and error.request.url
            raise error
        finally:
            self.logger.info("HTTP {} status: {}, {}, size: {}, time: {}"
                             .format(method, response_code, url, content_length, total_time))

    def generate_session(self):
        session = requests.Session()
        return session
