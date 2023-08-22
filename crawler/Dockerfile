FROM python:3.9.13

RUN apt-get -y update
COPY requirements.txt /usr/src/crawler/
WORKDIR /usr/src/crawler
RUN pip install --no-cache-dir -r requirements.txt
COPY . /usr/src/crawler

ENTRYPOINT ["python", "crawling.py"]
