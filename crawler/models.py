import os

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Integer, String
from sqlalchemy.sql.schema import Column

DATABASE_URL = os.environ.get('DATABASE_URL')

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
db = SessionLocal()


class CrawlUrl(Base):
    __tablename__ = 'crawl_url'

    id = Column(Integer, primary_key=True)
    type_id = Column(Integer, nullable=False)
    url = Column(String, nullable=False)


class Scholarship(Base):
    __tablename__ = 'scholarship'

    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    department = Column(String, nullable=False)
    view_count = Column(Integer, nullable=False)
    apply_start_at = Column(String, nullable=False)
    apply_end_at = Column(String, nullable=False)
    num_selection = Column(String, nullable=False)
    benefit = Column(String, nullable=False)
    apply_method = Column(String, nullable=False)
    target = Column(String, nullable=False)
    contact = Column(String, nullable=False)
    origin_url = Column(String, nullable=False)
