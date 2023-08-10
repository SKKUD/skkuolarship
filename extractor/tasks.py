import os

import openai

from celeryconfig import app

OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')

summary_schema = {
    "type": "object",
    "properties": {
        "신청기간": {
            "type": "string",
            "description": "장학금 신청 시작 날짜와 마감 날짜. 만약 \.으로 구분이 되어있다면 \.을 년, 월, 일로 구분해줘. 예를 들어, "
                           "'2023년 7월 8일에서 2023년 7월 10일 오후 5시까지'라면 '2023년 7월 8일 ~ 2023년 7월 10일 17시' 라고 적어줘. "
                           "만약 연도가 없이 월, 일만 적혀있다면 '2023년'을 붙여줘. "
                           "예를 들어 '7월 8일 ~ 7월 10일'라면 '2023년 7월 8일 ~ 2023년 7월 10일'라고 적어줘."

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
def extract(script):
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
            {"role": "user", "content": f"user-given texts: {script}"},
        ],
        functions=[{
            "name": "extractor",
            "description": "extract essential information from user-given texts. Key와 관련된 내용이 없다면 value를 null type의 "
                           "null로 적어줘",
            "parameters": summary_schema
        }],
        function_call={
            "name": "extractor"
        }
    )

    return response["choices"][0]["message"]["function_call"]["arguments"]
