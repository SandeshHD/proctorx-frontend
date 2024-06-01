from seleniumbase import BaseCase
BaseCase.main(__name__, __file__)


class RecorderTest(BaseCase):
    def test_recording(self):
        self.open("http://18.235.13.128:30000/auth")
        self.type("app-login.ng-star-inserted form input", "1GA19CS191")
        self.type("app-login.ng-star-inserted form div:nth-of-type(2) input", "Pa$$word123")
        self.click('button:contains("SIGN IN")')
        self.click("div.text-container app-test:nth-of-type(3) button")
        self.click("button.start-test")
        self.click("app-test-window.ng-star-inserted app-question form label:nth-of-type(2)")
        self.click('button:contains("Next")')
        self.click('label[for="Post-order traversal"]')
        self.click('button:contains("Next")')
        self.click("app-test-window.ng-star-inserted app-question form label")
        self.click('button:contains("Next")')
        self.click('input[id="Kruskal\'s Algorithm"]')
        self.click('button:contains("Next")')
        self.click('input[id="Longest Common Subsequence"]')
        self.click('button:contains("Next")')
