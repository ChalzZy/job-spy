from selenium import webdriver
import time
import unittest

EMAIL = 'test@gmail.com'
PASSWORD = 'test'

class Profile(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.get('http://localhost:3000/profile')

    def testTabs(self):
        driver = self.driver

        #check if change password tab goes to login page
        update = driver.find_element_by_xpath("//*[@id='home']")
        update.click()
        time.sleep(2)
        
        email_address = driver.find_element_by_name("email")
        email_address.send_keys(EMAIL)
        time.sleep(2)
        
        password = driver.find_element_by_name("password")
        password.send_keys(PASSWORD)

        button=driver.find_element_by_xpath("//button[@type='submit']")
        button.click()

        time.sleep(2)

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

    def tearDown(self):
        time.sleep(5)
        self.driver.close()

if __name__ == '__main__':
    unittest.main()

