from selenium import webdriver
import time
import unittest

EMAIL = 'test@gmail.com'
PASSWORD = 'test'

class Favourites(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.get('http://localhost:3000/login')

    def testTabs(self):
        driver = self.driver

    # Enter email
        email_address = driver.find_element_by_xpath("//*[@id='body']/form/div[1]/input")
        email_address.send_keys(EMAIL)
        time.sleep(2)

    # Enter password
        password = driver.find_element_by_xpath("//*[@id='body']/form/div[2]/input")
        password.send_keys(PASSWORD)
        time.sleep(2)

    # Click Submit
        submit = driver.find_element_by_xpath("/html/body/form/button")
        submit.click()
        time.sleep(2)

        fav_button = driver.find_element_by_id("button1")
        fav_button.click()

        drop_down = driver.find_element_by_id("navbarScrollingDropdown")
        drop_down.click()

        driver.get('http://localhost:3000/profile')
        
        button = driver.find_element_by_xpath("//*[@id='fav']")
        button.click()
        time.sleep(2)

    def tearDown(self):
        time.sleep(5)
        self.driver.close()

if __name__ == '__main__':
    unittest.main()