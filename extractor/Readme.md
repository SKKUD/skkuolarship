# Extractor
장학금 게시글에서 장학금 정보를 추출하는 Celery Task Worker 입니다.
### System Environment
##### AWS
해당 이미지는 AWS SQS를 이용하기 때문에 AWS 권한이 필요합니다.
* AWS Infra 사용시 IAM Role을 이용해서 SQS 권한 부여 후 환경변수로 AWS 키 설정
    * `AWS_ACCESS_KEY_ID`
    * `AWS_SECRET_ACCESS_KEY`
##### OpenAI
해당 이미지는 GPT-3.5 API를 이용하기 때문에 OpenAI API 권한이 필요합니다.
* `OPENAI_API_KEY` OpenAI API Key
##### Queue Name
* `QUEUE_NAME` 이벤트를 받아 올 Queue 이름
### How to install
``` bash
pip install -r requirements.txt
```
### How to run
``` bash
celery -A tasks worker --concurrency=1 --loglevel=INFO
```
### Return
``` json
{
"신청기간": "2023년 7월 5일(수) ~ 7월 21일(금) 17시 까지",
"선발인원": "해당 단과대학(학과)별 3,4학년 각 1명씩 추천 예정",
"장학혜택": "생활 보조를 위한 학업지원장학금 250만원",
"접수방법": {
"제출처": "skkujanghak@skku.edu",
"제출서류": [
	"2023 (재)보건장학회 학업지원 장학금 지원신청서 및 학과장 추천서",
	"소득 구간 증빙서류",
	"직전학기(2023년 1학기) 성적표",
	"2023 (재)보건장학회 개인정보 수집이용 동의서(본인)"
],
"제출기한": "2023년 7월 5일(수) ~ 7월 21일(금) 17시 까지"
},
"지원대상": [
	"2023학년도 현재 아래 해당 학과에 재학 중인 학부생으로서, 다음 각 항을 모두 충족하는 3, 4학년 학생",
	"직전 학기(2023학년도 1학기) 학점이 3.2(4.5만점) 이상인 자",
	"2023학년도 2학기에 등록 예정인 자",
	"직전 학기(2023학년도 1학기) 한국장학재단 소득분위 5구간(국가장학금 소득 5분위) 이하인 자",
	"2023학년도 1학기에 총 12학점 이상 이수한 자",
	"보건장학회 장학금 수여식(2023.8.21 예정)에 참석 가능한 자"
],
"문의": "학생지원팀 외부장학 02-760-1167"
}
```