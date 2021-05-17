from selenium import webdriver
import time
import unittest

USER_NAME = 'test@jobspy.co.nz'
# intentional incorrect password
PASSWORD = 'test'

class Login(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.get('http:/localhost:3000')

    def testLogin(self):
        driver = self.driver
        
        # Goto login page
        login_button = driver.find_element_by_xpath("//*[@id='navbarTogglerDemo02']/a[1]")
        login_button.click()
        time.sleep(1)

        # Enter email
        email_address = driver.find_element_by_xpath("//*[@id='body']/form/div[1]/input")
        email_address.send_keys(USER_NAME)
        time.sleep(2)

        # Enter password
        password = driver.find_element_by_xpath("//*[@id='body']/form/div[2]/input")
        password.send_keys(PASSWORD)
        time.sleep(2)

        # Click login
        login = driver.find_element_by_xpath("/html/body/form/button")
        login.click()
        time.sleep(5)

        
        #result = driver.find_element_by_xpath('/html/body/form/div[2]/div').displayed()
        self.assertEqual(f'http://localhost:3000/login', driver.current_url, 'URL Error - Not As Expected')


    def tearDown(self):
        time.sleep(1)
        self.driver.close()

if __name__ == '__main__':
    unittest.main()