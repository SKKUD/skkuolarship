ALL_CRAWLER = {}


def register_crawler(type_id, crawler):
    ALL_CRAWLER[type_id] = crawler


def get_crawler(type_id):
    return ALL_CRAWLER.get(type_id)
