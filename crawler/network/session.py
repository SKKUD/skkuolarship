from http.cookiejar import CookieJar
from logging import getLogger

from requests import Session

logger = getLogger('crawler')


class SessionInfo:
    @classmethod
    def from_session(cls, session: Session):
        return cls(session.cookies)

    def __init__(self, cookie_jar=CookieJar()) -> None:
        super().__init__()
        self.cookie_jar = cookie_jar

    def apply_to_session(self, session: Session):
        session.cookies = self.cookie_jar

    def set_cookies(self, cookies):
        for cookie in cookies:
            self.cookie_jar.set_cookie(cookie)
