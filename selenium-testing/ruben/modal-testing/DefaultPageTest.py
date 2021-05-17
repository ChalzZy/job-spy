from selenium import webdriver
import os
import time
import unittest
from selenium.webdriver.common.keys import Keys

class SearchJobs(unittest.TestCase):
    def setUp(self):
        PROJECT_ROOT = os.path.abspath(os.path.dirname(__file__))
        DRIVER_BIN = os.path.join(PROJECT_ROOT, "chromedriver")
        self.driver = webdriver.Chrome(executable_path = DRIVER_BIN)
        self.driver.get('http://localhost:3000/jobsearch')
        options = webdriver.ChromeOptions()
        options.add_argument('--ignore-ssl-errors')
        time.sleep(1)

    def test_job_search(self):
        driver = self.driver

        # Find & input 'developer' into the search bar
        driver.find_element_by_id('userInput').send_keys('developer')
        time.sleep(1)
        driver.find_element_by_id('searchButton').click()
        time.sleep(3)

        # Select & click 'Apply' for the first job listing
        applyButton = driver.find_element_by_xpath('//button[@data-bs-target="#modal0"]')
        applyButton.click()
        time.sleep(5)

        # Test that correct URL is being generated based on the clipboard
        self.assertEqual('http://localhost:3000/jobsearch?search=developer&page=1&location=All+Locations&category=All+Categories&modal=modal0',
                         driver.current_url, 'URL Error - Not As Expected')

    def tearDown(self):
        time.sleep(5)
        self.driver.close()


if __name__ == '__main__':
    unittest.main()
