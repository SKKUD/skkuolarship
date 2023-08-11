from utils import enqueue_extract_task
from database import db
from models import CrawlUrl
import crawler


def crawl(url):
    matched_crawler = crawler.get_crawler(url.type_id)
    if not matched_crawler:
        print('No crawler found for type_id: {}, url: {}'.format(url.type_id, url.url))
        return False

    crawler_instance = matched_crawler(url.url)
    result = crawler_instance.crawl()

    for data in result:
        enqueue_extract_task(**data)

    return True


def main():
    urls = db.query(CrawlUrl).all()
    for url in urls:
        crawl(url)
    return True


if __name__ == '__main__':
    main()
