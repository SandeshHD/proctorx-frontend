from seleniumbase import BaseCase
BaseCase.main(__name__, __file__)


class RecorderTest(BaseCase):
    def test_recording(self):
        self.open("http://18.235.13.128:30001/auth")
        self.type("app-login.ng-star-inserted form input", "yashwanth@gat.ac.in")
        self.type("app-login.ng-star-inserted form div:nth-of-type(2) input", "Pa$$word123\n")
        self.click("table#pr_id_4-table tbody tr:nth-of-type(2) td:nth-of-type(8) button:nth-of-type(2)")
        self.click("a#p-accordiontab-0 span")
        self.click("a#p-accordiontab-0")
        self.click("app-view-tests.ng-star-inserted p-dialog div div button")
        self.click("table#pr_id_4-table tbody tr:nth-of-type(2) td:nth-of-type(6) p-tag span span")
