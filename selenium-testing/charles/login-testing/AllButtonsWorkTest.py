from selenium import webdriver
import time
import unittest

class Login(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.get('http:/localhost:3000/login')

    def testLogin(self):
        driver = self.driver

        # Check sign up button works
        signUpLink = driver.find_element_by_xpath("/html/body/form/p/a")
        signUpLink.click()
        self.assertEqual(f'http://localhost:3000/signup', driver.current_url, 'URL Error - Not As Expected')
        time.sleep(1)
        self.driver.get('http:/localhost:3000/login')

        # Check about us button works
        aboutUsLink = driver.find_element_by_xpath("//*[@id='footer']/div/p/a")
        aboutUsLink.click()
        self.assertEqual(f'http://localhost:3000/aboutus', driver.current_url, 'URL Error - Not As Expected')
        self.driver.get('http:/localhost:3000/login')

        # Click login
        login = driver.find_element_by_xpath("/html/body/form/button")
        login.click()
        self.assertEqual(f'http://localhost:3000/login', driver.current_url, 'URL Error - Not As Expected')

    def tearDown(self):
        time.sleep(5)
        self.driver.close()

if __name__ == '__main__':
    unittest.main()