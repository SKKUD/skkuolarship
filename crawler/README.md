# Crawler
교내 장학금 게시글을 크롤링하여, SQS에 celery task로 전송합니다.
### System Environment
##### AWS
해당 이미지는 AWS SQS를 이용하기 때문에 AWS 권한이 필요합니다.
* AWS Infra 사용시 IAM Role을 이용해서 SQS 권한 부여 후 환경변수로 AWS 키 설정
    * `AWS_ACCESS_KEY_ID`
    * `AWS_SECRET_ACCESS_KEY`
##### Queue Name
* `QUEUE_NAME` 이벤트를 받아 올 Queue 이름
* `QUEUE_URL` 이벤트를 받아 올 Queue URL
##### Database
* `DATABASE_URL` 데이터베이스 URL
### How to install
``` bash
pip install -r requirements.txt
```
### How to run
``` bash
python crawling.py
```
