from utils import enqueue_extract_task
from models import db
from models import CrawlUrl, Scholarship
import crawler


def crawl(url):
    matched_crawler = crawler.get_crawler(url.type_id)
    if not matched_crawler:
        print('No crawler found for type_id: {}, url: {}'.format(url.type_id, url.url))
        return False

    crawler_instance = matched_crawler(url.url)
    result = crawler_instance.crawl()

    for data in result:
        extract(**data)

    return True


def extract(url=None, **kwargs):
    if not url:
        print('No url found.')
        return False

    existing_data = db.query(Scholarship).filter(Scholarship.origin_url == url).first()
    if existing_data:
        print('Already crawled url: {}'.format(url))
        return False

    enqueue_extract_task(url=url, **kwargs)
    return True


def main():
    urls = db.query(CrawlUrl).all()
    for url in urls:
        crawl(url)
    return True


if __name__ == '__main__':
    main()
