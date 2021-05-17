from selenium import webdriver
import time
import unittest

USER_NAME = 'testco.nz'
PASSWORD = 'test123'

class signUp(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.get('http:/localhost:3000/')

    def testSignUp(self):
        driver = self.driver
        
        # Goto SignUp page
        signUp_button = driver.find_element_by_xpath("//*[@id='navbarTogglerDemo02']/a[2]")
        signUp_button.click()
        time.sleep(1)

        # Enter email
        email_address = driver.find_element_by_xpath("//*[@id='body']/form/div[1]/input")
        email_address.send_keys(USER_NAME)
        time.sleep(2)

        # Enter password
        password = driver.find_element_by_xpath("//*[@id='body']/form/div[2]/input")
        password.send_keys(PASSWORD)
        time.sleep(2)

        # Click Submit
        submit = driver.find_element_by_xpath("/html/body/form/button")
        submit.click()
        time.sleep(2)

        # Check that redirection to homepage works
        self.assertEqual(f'http://localhost:3000/', driver.current_url, 'URL Error - Not As Expected')

    def tearDown(self):
        time.sleep(5)
        self.driver.close()

if __name__ == '__main__':
    unittest.main()