import json

import requests
from bs4 import BeautifulSoup

from utils import enqueue_extract_task

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'}

skku_base_url = "https://www.skku.edu/skku/campus/skk_comm/notice06.do"
hakbu_base_url = "https://hakbu.skku.edu/hakbu/community/under_notice.do"
scos_base_url = "https://scos.skku.edu/scos/community/under_notice.do"
liberalarts_base_url = "https://liberalarts.skku.edu/liberal/community/under_notice.do"
sscience_base_url = "https://sscience.skku.edu/sscience/community/under_notice.do"
ecostat_base_url = "https://ecostat.skku.edu/ecostat/community/under_notice.do"
biz_base_url = "https://biz.skku.edu/bizskk/community/notice.do"
coe_base_url = "https://coe.skku.edu/coe/community/under_notice.do"
art_base_url = "https://art.skku.edu/art/community/under_notice.do"
cscience_base_url = "https://cscience.skku.edu/cscience/community/under_notice.do"
ice_base_url = "https://ice.skku.edu/ice/community/notice.do"
enc_base_url = "https://enc.skku.edu/enc/community/under_notice.do"
sco_base_url = "https://sco.skku.edu/sco/community/notice.do"
skb_base_url = "https://skb.skku.edu/biotech/community/under_notice.do"
sport_base_url = "https://sport.skku.edu/sports/community/under_notice.do"
icon_base_url = "https://icon.skku.edu/icon/community/under_notice.do"
cse_base_url = "https://cse.skku.edu/cse/notice.do"

skku_url = "https://www.skku.edu/skku/campus/skk_comm/notice06.do"
hakbu_url = "https://hakbu.skku.edu/hakbu/community/under_notice.do?mode=list&srCategoryId1=236&srSearchKey=&srSearchVal="
scos_url = "https://scos.skku.edu/scos/community/under_notice.do?mode=list&srCategoryId1=236&srSearchKey=&srSearchVal="
liberalarts_url = "https://liberalarts.skku.edu/liberal/community/under_notice.do?mode=list&srCategoryId1=236&srSearchKey=&srSearchVal="
sscience_url = "https://sscience.skku.edu/sscience/community/under_notice.do?mode=list&srCategoryId1=236&srSearchKey=&srSearchVal="
ecostat_url = "https://ecostat.skku.edu/ecostat/community/under_notice.do?mode=list&srCategoryId1=236&srSearchKey=&srSearchVal="
biz_url = "https://biz.skku.edu/bizskk/community/notice.do?mode=list&srCategoryId1=754&srSearchKey=&srSearchVal="
coe_url = "https://coe.skku.edu/coe/community/under_notice.do?mode=list&srCategoryId1=236&srSearchKey=&srSearchVal="
art_url = "https://art.skku.edu/art/community/under_notice.do?mode=list&srCategoryId1=236&srSearchKey=&srSearchVal="
cscience_url = "https://cscience.skku.edu/cscience/community/under_notice.do?mode=list&srCategoryId1=236&srSearchKey=&srSearchVal="
ice_url = "https://ice.skku.edu/ice/community/notice.do?mode=list&srCategoryId1=816&srSearchKey=&srSearchVal="
enc_url = "https://enc.skku.edu/enc/community/under_notice.do?mode=list&srCategoryId1=236&srSearchKey=&srSearchVal="
sco_url = "https://sco.skku.edu/sco/community/notice.do?mode=list&srCategoryId1=267&srSearchKey=&srSearchVal="
skb_url = "https://skb.skku.edu/biotech/community/under_notice.do?mode=list&srCategoryId1=236&srSearchKey=&srSearchVal="
sport_url = "https://sport.skku.edu/sports/community/under_notice.do?mode=list&srCategoryId1=236&srSearchKey=&srSearchVal="
icon_url = "https://icon.skku.edu/icon/community/under_notice.do?mode=list&srCategoryId1=236&srSearchKey=&srSearchVal="
cse_url = "https://cse.skku.edu/cse/notice.do?mode=list&srCategoryId1=1586&srSearchKey=&srSearchVal="

departments = [
    ("SKKU", skku_url, skku_base_url),
    ("Hakbu", hakbu_url, hakbu_base_url),
    ("SCOS", scos_url, scos_base_url),
    ("Liberal Arts", liberalarts_url, liberalarts_base_url),
    ("SScience", sscience_url, sscience_base_url),
    ("Ecostat", ecostat_url, ecostat_base_url),
    ("Biz", biz_url, biz_base_url),
    ("COE", coe_url, coe_base_url),
    ("Art", art_url, art_base_url),
    ("CScience", cscience_url, cscience_base_url),
    ("ICE", ice_url, ice_base_url),
    ("ENC", enc_url, enc_base_url),
    ("SCO", sco_url, sco_base_url),
    ("SKB", skb_url, skb_base_url),
    ("Sport", sport_url, sport_base_url),
    ("ICON", icon_url, icon_base_url),
    ("CSE", cse_url, cse_base_url)
]

except_keyword_list = ["결과", "[행사/세미나]", "[학사]", "[입학]", "[취업]", "[채용모집]", "[일반]", "[수강증원]"]


# 학부마다 장학공지
def get_department_notice_list(homepage_url, base_url):
    crawled_data_list = []  # 크롤링한 데이터를 저장할 리스트
    notice_url_list = []
    request = requests.get(homepage_url, headers=headers)
    html = request.text
    soup = BeautifulSoup(html, 'html.parser')

    urls = soup.select("#jwxe_main_content > div > div > div.board-name-list.board-wrap > ul > li > dl > dt > a")

    # specific urls
    for url in urls:
        notice_url_list.append(url.attrs['href'])

    # specific information
    for notice_url in notice_url_list:
        notice_body = ""
        request = requests.get(base_url + notice_url, headers=headers)
        html = request.text
        soup = BeautifulSoup(html, 'html.parser')

        notice_title = soup.select_one("h4").text
        notice_writer = soup.find('ul', class_="board-etc-wrap").find('li').text

        notice_body_list = soup.find("div", class_='board-view-content-wrap board-view-txt')
        isImg = notice_body_list.find('img')

        if any(t in notice_title.strip() for t in except_keyword_list) != True and not isImg:
            data_dict = {
                "url": base_url + notice_url,
                "writer": notice_writer,
                "title": notice_title.strip(),
                "body": notice_body_list.text.strip()
            }
            crawled_data_list.append(data_dict)

    return crawled_data_list


def get_skku_notice_list(homepage_url, base_url):
    crawled_data_list = []  # 크롤링한 데이터를 저장할 리스트
    notice_url_list = []
    request = requests.get(homepage_url, headers=headers)
    html = request.text
    soup = BeautifulSoup(html, 'html.parser')

    urls = soup.select("#jwxe_main_content > div > div > div > div > ul > li > dl > dt > a")

    # specific urls
    for url in urls:
        notice_url_list.append(url.attrs['href'])

    # specific information
    for notice_url in notice_url_list:
        notice_body = ""
        request = requests.get(base_url + notice_url, headers=headers)
        html = request.text
        soup = BeautifulSoup(html, 'html.parser')
        notice_title = soup.find("em", class_='ellipsis').text
        notice_writer = soup.find('li', class_="noline").text

        # Notice body can be directly extracted from the pre tag
        notice_body = soup.find("pre").text.strip()

        if any(t in notice_title for t in except_keyword_list) != True:
            data_dict = {
                "url": base_url + notice_url,
                "writer": notice_writer,
                "title": notice_title.strip(),
                "body": notice_body
            }
            crawled_data_list.append(data_dict)

    return crawled_data_list


# get_skku_notice_list(skku_url, skku_base_url)
crawled_data_list = get_department_notice_list(cse_url, cse_base_url)
# get_department_notice_list(cse_url, cse_base_url)
# schedule.every().day.at("09:00").do(함수)

TASK_NAME = 'tasks.extract'

# 각 학부별로 크롤링한 데이터를 SQS에 보냄
for department_name, department_url, department_base_url in departments:
    if department_name == "SKKU":
        crawled_data_list = get_skku_notice_list(department_url, department_base_url)
    else:
        crawled_data_list = get_department_notice_list(department_url, department_base_url)

    if crawled_data_list:
        for data in crawled_data_list:
            enqueue_extract_task(**data)
    else:
        print(f"No data collected for {department_name}")

# 크롤링한 데이터를 txt 파일에 저장
with open('crawled_data.txt', 'w', encoding='utf-8') as file:
    for data in crawled_data_list:
        file.write(json.dumps(data, ensure_ascii=False) + '\n')


# 각 학부별로 데이터 수집하고 파일에 저장하는 함수
def crawl_and_save_department_data(department_name, homepage_url, base_url):
    if department_name == "SKKU":
        crawled_data_list = get_skku_notice_list(homepage_url, base_url)
    else:
        crawled_data_list = get_department_notice_list(homepage_url, base_url)

    if crawled_data_list is not None:
        file_name = f"{department_name}_crawled_data.txt"

        with open(file_name, 'w', encoding='utf-8') as file:
            for data in crawled_data_list:
                file.write(json.dumps(data, ensure_ascii=False) + '\n')

        print(f"Data for {department_name} saved in {file_name}")
    else:
        print(f"No data collected for {department_name}")


# 각 학부별로 크롤링하고 데이터를 파일에 저장
for department_name, department_url, department_base_url in departments:
    crawl_and_save_department_data(department_name, department_url, department_base_url)
