from selenium import webdriver
import time
import unittest


class SearchJobs(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.get('http://localhost:3000/')
        options = webdriver.ChromeOptions()
        options.add_argument('--ignore-ssl-errors')
        time.sleep(1)

    def test_clickable_tags(self):
        driver = self.driver

        # Find & click on the '.NET' job tag
        time.sleep(1)
        tagTerm = '.NET'
        driver.find_element_by_xpath(f'//button[text()="{tagTerm}"]').click()
        time.sleep(1)

        # Test that correct URL is being generated based on job tag clicked
        self.assertEqual(f'http://localhost:3000/jobsearch?search={tagTerm}&page=1&location=All%20Locations&category=All%20Categories',
                         driver.current_url, 'URL Error - Not As Expected')

    def tearDown(self):
        time.sleep(5)
        self.driver.close()


if __name__ == '__main__':
    unittest.main()
