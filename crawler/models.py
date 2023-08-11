from sqlalchemy import Integer, String
from sqlalchemy.sql.schema import Column
from database import Base


class CrawlUrl(Base):
    __tablename__ = 'crawl_url'

    id = Column(Integer, primary_key=True)
    type_id = Column(Integer, nullable=False)
    url = Column(String, nullable=False)

    def __repr__(self):
        return f'<CrawlUrl {self.id} {self.type_id} {self.url}>'
