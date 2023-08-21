from urllib.parse import urljoin

from requests import Response
import crawler
from crawler._abstract_crawler import AbstractArticleCrawler


class SkkuCrawler(AbstractArticleCrawler):
    target_type = 3

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def parse_response(self, response: Response):
        soup = self._parse_html(response.text)
        urls = soup.select("#jwxe_main_content > div > div > div.board-name-list.board-wrap > ul > li > dl > dt > a")
        notice_url_list = []
        result = []  # 크롤링한 데이터를 저장할 리스트

        # specific urls
        for url in urls:
            notice_url_list.append(urljoin(self.url, url.attrs['href']))

        # specific information
        for notice_url in notice_url_list:
            soup = self._parse_html(self.do_request(url=notice_url).text)
            notice_title = soup.select_one("h4").text
            notice_writer = soup.find('ul', class_="board-etc-wrap").find('li').text
            notice_body_list = soup.find("div", class_='board-view-content-wrap board-view-txt')
            is_img = notice_body_list.find('img')

            if not (any(t in notice_title.strip() for t in self.except_keyword_list) or is_img):
                data_dict = {
                    "url": notice_url,
                    "writer": notice_writer,
                    "title": notice_title.strip(),
                    "body": notice_body_list.text.strip()
                }
                result.append(data_dict)
        return result


crawler.register_crawler(SkkuCrawler.target_type, SkkuCrawler)
