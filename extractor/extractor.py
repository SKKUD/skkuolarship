########################
####### 환경 설정 #######
########################
import openai
import os
import json
import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
openaiFile = os.path.join(BASE_DIR, 'config/openai.json')

with open(openaiFile) as f:
    secrets = json.loads(f.read())


def get_secret(setting, secrets=secrets):
    """비밀 변수를 가져오거나 명시적 예외를 반환한다."""
    try:
        return secrets[setting]
    except KeyError:
        error_msg = "Set the {} environment variable".format(setting)
        raise ValueError(error_msg)


# @param {type:"string"}
OPENAI_API_KEY = get_secret("OPENAI_API_KEY")

########################
##### openai 사용 ######
########################

summary_schema = {
    "type": "object",
    "properties": {
        "신청기간": {
            "type": "string",
            "description": "장학금 신청기간 혹은 장학금 신청마감기한"
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
    "required": ["신청기간", "지원대상"]
}

# 키워드 추출해줘.


def main(script):
    openai.api_key = OPENAI_API_KEY
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system",
             "content": f"""You are a helpful assistant that exactly classify the information from user-given texts into given components. components: '신청기간(혹은 장학금 신청마감기한)', '선발인원', '장학혜택', '접수방법(제출처, 제출서류, 서류제출기한)', '지원대상(혹은 신청자격)', '문의'. """
             },
            {"role": "user", "content": f"user-given texts: {script}"},
            # {"role": "assistant", "content": """
            #     <추가 지시사항>
            #     분류한 글을 아래 다음과 같은 json 형태로 반환해줘.
            #     Keys must not be changed, but values can be changed.
            #     Key와 관련된 내용이 없다면 value를 null로 적어줘.
            #     {{
            #     "신청기간": "2023년 7월 14일(금) ~ 7월 28일(금) 11시",
            #     "선발인원": "3명",
            #     "장학혜택": "학기당 200만원",
            #     "접수방법": {{
            #       "제출처": "600주년기념관 1층 학생지원팀",
            #       "제출서류": ["사회공헌활동 증빙", "재단서식", "기본서류", "모집분야 별 선택요건 증빙"],
            #       "제출기한": "2023년 7월 14일(금) ~ 7월 28일(금) 11시"
            #     }},
            #     "지원대상": ["대한민국 국적의 대학생", "2023학년도 2학기에 재학 예정인 학생",
            #     "기업 및 타 재단에서 ‘생활비 장학금’을 수혜 받고 있지 않은 학생"],
            #     "문의": "skkujanghak@skku.edu"
            #     }}
            #     """}
        ],
        functions=[{
            "name": "extractor",
            "description": "extract essential information from user-given texts. Key와 관련된 내용이 없다면 value를 null로 적어줘",
            "parameters": summary_schema
        }],
        function_call={
            "name": "extractor"
        }
    )

    # return response["choices"][0]["message"]["content"]
    return response["choices"][0]["message"]["function_call"]["arguments"]


if __name__ == '__main__':
    # script = sys.argv[1]

    # if len(sys.argv) < 2:
    #     print("insufficient arguments!")
    #     sys.exit()
    # elif len(sys.argv) > 2:
    #     print("too many arguments!")

    # script = ""
    # while True:
    #     b = sys.stdin.readline().strip()
    #     if not b:
    #         break
    script = input()
    content = main(script)
    print(content)
