from urllib.parse import urljoin

from requests import Response
import crawler
from crawler._abstract_crawler import AbstractArticleCrawler


class SkkuMainCrawler(AbstractArticleCrawler):
    target_type = 1

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def parse_response(self, response: Response):
        soup = self._parse_html(response.text)
        urls = soup.select("#jwxe_main_content > div > div > div > div > ul > li > dl > dt > a")
        notice_url_list = []
        result = []  # 크롤링한 데이터를 저장할 리스트

        # specific urls
        for url in urls:
            notice_url_list.append(urljoin(self.url, url.attrs['href']))

        # specific information
        for notice_url in notice_url_list:
            soup = self._parse_html(self.do_request(url=notice_url).text)
            notice_title = soup.find("em", class_='ellipsis').text
            notice_writer = soup.find('li', class_="noline").text

            # Notice body can be directly extracted from the pre tag
            notice_body = soup.find("pre").text.strip()

            if not any(t in notice_title for t in self.except_keyword_list):
                data_dict = {
                    "url": notice_url,
                    "writer": notice_writer,
                    "title": notice_title.strip(),
                    "body": notice_body
                }
                result.append(data_dict)

        return result


crawler.register_crawler(SkkuMainCrawler.target_type, SkkuMainCrawler)
