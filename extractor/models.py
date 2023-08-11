from __future__ import annotations

import os
from typing import List

from sqlalchemy import create_engine, Integer, String, Table, ForeignKey
from sqlalchemy.sql.schema import Column
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship, Mapped, mapped_column

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


scholarship_tag = Table('scholarship_tag', Base.metadata,
                        Column('scholarship_id', ForeignKey('scholarship.id'), primary_key=True),
                        Column('tag_id', ForeignKey('tag.id'), primary_key=True),
                        )


class Scholarship(Base):
    __tablename__ = 'scholarship'

    id: Mapped[int] = mapped_column(primary_key=True)
    title = Column(String, nullable=False)
    department = Column(String, nullable=False)
    view_count = Column(Integer, nullable=False, default=0)
    # apply_start_at = Column(String, nullable=False)
    # apply_end_at = Column(String, nullable=False)
    # num_selection = Column(String, nullable=False)
    # benefit = Column(String, nullable=False)
    # apply_method = Column(String, nullable=False)
    # target = Column(String, nullable=False)
    # contact = Column(String, nullable=False)
    apply_start_at = Column(String, nullable=True)
    apply_end_at = Column(String, nullable=True)
    num_selection = Column(String, nullable=True)
    benefit = Column(String, nullable=True)
    apply_method = Column(String, nullable=True)
    target = Column(String, nullable=True)
    contact = Column(String, nullable=True)
    origin_url = Column(String, nullable=False)
    tags: Mapped[List[Tag]] = relationship(secondary='scholarship_tag', back_populates='scholarships')


class Tag(Base):
    __tablename__ = 'tag'

    id: Mapped[int] = mapped_column(primary_key=True)
    name = Column(String, nullable=False)
    scholarships: Mapped[List[Scholarship]] = relationship(secondary='scholarship_tag', back_populates='tags')
