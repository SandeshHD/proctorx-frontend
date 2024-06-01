from seleniumbase import BaseCase
BaseCase.main(__name__, __file__)


class RecorderTest(BaseCase):
    def test_recording(self):
        self.open("http://18.235.13.128:30001/auth")
        self.type("app-login.ng-star-inserted form input", "yashwanth@gat.ac.in")
        self.type("app-login.ng-star-inserted form div:nth-of-type(2) input", "Pa$$word123\n")
        self.click('a[href="/notice-board"] div')
        self.click('button[label="Create Notice"]')
        self.type("app-notice-board.ng-star-inserted p-dialog div div:nth-of-type(2) form input", "College Fest")
        self.type("textarea", 'Fest "Interact" is about to begin from June 15th. I request everyone to participate and involve in the fest and make it successful. \n')
        self.click('button[label="Save Notice"]')
