from seleniumbase import BaseCase
BaseCase.main(__name__, __file__)


class RecorderTest(BaseCase):
    def test_recording(self):
        self.open("http://18.235.13.128:30001/auth")
        self.type("app-login.ng-star-inserted form input", "yashwanth@gat.ac.in")
        self.type("app-login.ng-star-inserted form div:nth-of-type(2) input", "Pa$$word123")
        self.click('button:contains("SIGN IN")')
        self.click('a[href="/create-test"] div')
        self.type('input[placeholder="Test name"]', "Sample Test")
        self.click("div.question-area div")
        self.click("table#pr_id_12-table tbody tr td:nth-of-type(3) button")
        self.click("table#pr_id_12-table tbody tr:nth-of-type(3) td:nth-of-type(3) button")
        self.click("div#pr_id_12 p-paginator span:nth-of-type(2) button:nth-of-type(2)")
        self.click("table#pr_id_12-table tbody tr:nth-of-type(4) td:nth-of-type(3) button")
        self.click("table#pr_id_12-table tbody tr:nth-of-type(2) td:nth-of-type(3) button")
        self.click("app-create-test.ng-star-inserted p-dialog:nth-of-type(2) div div button")
        self.type('input[placeholder="Deadline"]', "06/28/2024 09:33:57")
        self.type('input[placeholder="Deadline"]', "06/28/2024 09:33:57")
        self.click('button[label="Save Test"]')
        self.click('a[href="/"] div')
        
