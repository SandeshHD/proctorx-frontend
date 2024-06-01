from seleniumbase import BaseCase
BaseCase.main(__name__, __file__)


class RecorderTest(BaseCase):
    def test_recording(self):
        self.open("http://18.235.13.128:30002/auth")
        self.type("div.router-container form input", "admin")
        self.type("div.router-container form div:nth-of-type(2) input", "admin\n")
        self.click('a[href="/view-students"] div')
        self.click("table#pr_id_16-table tbody tr:nth-of-type(4) td:nth-of-type(6) p-tag span span")
        self.click("table#pr_id_16-table tbody tr:nth-of-type(4) td:nth-of-type(7) button")
        self.click("app-view-students.ng-star-inserted p-dialog:nth-of-type(2) div div button")
        self.click('a[href="/faculties"] div')
        self.click("table#pr_id_24-table tbody tr:nth-of-type(4) td:nth-of-type(7) button")
        self.click('button[label="Update"]')
        self.click('a[href="/branches"] div')
        self.click("table#pr_id_28-table tbody tr:nth-of-type(5) td:nth-of-type(5) button:nth-of-type(2)")
        self.click("body div:nth-of-type(5) div:nth-of-type(2) button:nth-of-type(2)")
        self.click('a[href="/topics"]')
        self.click('a[href="/notice-board"] div')
