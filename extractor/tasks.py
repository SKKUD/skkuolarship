import json
import os
from datetime import datetime

import openai
from celery.utils.log import get_task_logger

from celeryconfig import app
from models import db, Scholarship

logger = get_task_logger(__name__)

OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')

summary_schema = {
    "type": "object",
    "properties": {
        "신청기간": {
            "type": "string",
            "description": "장학금 신청 시작 날짜와 마감 날짜를 '%Y.%m.%d ~ %Y.%m.%d' 형식으로 적어줘. "
                           "'2023년 7월 8일에서 2023년 7월 10일 오후 5시까지'라면 '2023.7.8 ~ 2023.7.10' 라고 적어줘. "
                           "만약 연도가 없이 월, 일만 적혀있다면 2023년으로 가정해줘. "
                           "예를 들어 '7월 8일 ~ 7월 10일'라면 '2023.7.8 ~ 2023.7.10'라고 적어줘."
                           "만약 날짜가 하나만 쓰여있다면 해당 날짜가 시작 및 마감날짜로 가정해줘."
                           "예를 들어 2022년 7월 8일이라면 '2022.7.8 ~ 2022.7.8'이라고 적어줘."
        },
        "선발인원": {
            "type": "string",
            "description": "장학금 선발 인원"
        },
        "장학혜택": {
            "type": "string",
            "description": "장학 혜택. 대출지원, 등록금지원, 거주지 지원, 프로그램 등 다양한 형태가 존재"
        },
        "접수방법": {
            "type": "object",
            "properties": {
                "제출처": {
                    "type": "string",
                    "description": "서류 제출처"
                },
                "제출서류": {
                    "type": "array",
                    "description": "제출할 서류들",
                    "items": {
                        "type": "string",
                        "description": "제출할 서류들 항목"
                    }
                },
                "제출기한": {
                    "type": "string",
                    "description": "서류 제출 기한"
                }
            },
        },
        "지원대상": {
            "type": "array",
            "description": "장학금 신청 가능한 조건",
            "items": {
                "type": "string"
            }
        },
        "문의": {
            "type": "string",
            "description": "문의처의 주소, 웹사이트 주소, 번호 혹은 이메일"
        },
    },
    "required": ["신청기간", "지원대상", "선발인원", "장학혜택", "접수방법", "문의"]

}


@app.task(name='tasks.extract')
def extract(url, writer, title, body):
    openai.api_key = OPENAI_API_KEY
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system",
             "content": f"""You are a helpful assistant that exactly classify the information from user-given texts into given components. components:
              1. '신청기간': 장학금 신청하는 기간 또는 마감기한.
              2. '선발인원': 장학금에서 모집 또는 선발하는 인원 수
              3. '장학혜택': 기숙사, 거주지, 시급, 등록금, 지원금액 등의 혜택
              4. '접수방법(제출처, 제출서류, 서류제출기한)': 장학금을 신청하기 위한 방법
              5. '지원대상(혹은 신청자격)': 장학금에 신청하기 위한 대상과 자격
              6. '문의': 장학금과 관련해 문의할 내용의 연락처 혹은 홈페이지 주소 """
             },
            {"role": "user", "content": f"user-given texts: {body}"},
        ],
        functions=[{
            "name": "extractor",
            "description": "extract essential information from user-given texts. Key와 관련된 내용이 없다면 value를 null type의 null로 적어줘",
            "parameters": summary_schema
        }],
        function_call={"name": "extractor"},
        temperature=0.5,
    )
    res = json.loads(response["choices"][0]["message"]["function_call"]["arguments"])

    title = title.replace('\n', '').replace('   ', '')
    apply_start_at = None
    apply_end_at = None
    if res['신청기간'] and type(res['신청기간']) == str:
        apply_start_at, apply_end_at = res['신청기간'].replace('년', '.').replace('월', '.').replace(' ', '').split('~')[:2]
        apply_start_at = datetime.strptime(apply_start_at, '%Y.%m.%d')
        apply_end_at = datetime.strptime(apply_end_at, '%Y.%m.%d')

    num_selection = res['선발인원']
    benefit = res['장학혜택']
    apply_method = None
    if res['접수방법'] and type(res['접수방법']) == dict:
        apply_method = '\n'.join([f"{k}: {v}" for k, v in res['접수방법'].items() if v])
    target = None
    if res['지원대상'] and type(res['지원대상']) == list:
        target = '\n'.join(res['지원대상'])
    contact = res['문의']
    try:
        scholarship = Scholarship(title=title, department=writer, origin_url=url,
                                  apply_start_at=apply_start_at, apply_end_at=apply_end_at,
                                  num_selection=num_selection, benefit=benefit, apply_method=apply_method,
                                  target=target, contact=contact)
        db.add(scholarship)
        db.commit()
    except Exception as e:
        logger.error(e)
        db.rollback()
