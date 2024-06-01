from seleniumbase import BaseCase
BaseCase.main(__name__, __file__)


class RecorderTest(BaseCase):
    def test_recording(self):
        self.open("http://18.235.13.128:30000/auth")
        self.type("app-login.ng-star-inserted form input", "1GA19CS199")
        self.type("app-login.ng-star-inserted form div:nth-of-type(2) input", "Pa$$word123")
        self.click('button:contains("SIGN IN")')
        self.click('a[href="/analytics"]')
        self.click('a[href="/"]')
        self.click('a[href="/analytics"]')
        self.click('app-statcard[label="Overall Rank"] div')
        self.click_with_offset("app-analytics.ng-star-inserted div:nth-of-type(2) p-chart canvas", 182, 54)
