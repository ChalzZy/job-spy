from selenium import webdriver
import time
import unittest


class SearchJobs(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.get('http://localhost:3000/jobsearch')
        options = webdriver.ChromeOptions()
        options.add_argument('--ignore-ssl-errors')
        time.sleep(1)

    def test_clickable_tags(self):
        driver = self.driver

        # Find & input 'developer' into the search bar
        driver.find_element_by_id('userInput').send_keys('react')
        time.sleep(1)

        # Select 'Auckland' from the location drop down menu
        selectLocation = driver.find_element_by_id('location-selection')
        for option in selectLocation.find_elements_by_tag_name('option'):
            if option.text == 'Christchurch':
                option.click()
                break

        time.sleep(1)

        # Select 'Intermediate' from the intermediate drop down menu
        selectCategory = driver.find_element_by_id('category-selection')
        for option in selectCategory.find_elements_by_tag_name('option'):
            if option.text == 'All Categories':
                option.click()
                break

        time.sleep(1)
        driver.find_element_by_id('searchButton').click()
        time.sleep(2)

        tagTerm = 'Full Stack'
        driver.find_element_by_xpath(f'//button[text()="{tagTerm}"]').click()
        time.sleep(1)

        # Test that correct URL is being generated based on job tag clicked
        self.assertEqual(f'http://localhost:3000/jobsearch?search=Full+Stack&page=1&location=Christchurch&category=All+Categories&modal=',
                         driver.current_url, 'URL Error - Not As Expected')

    def tearDown(self):
        time.sleep(5)
        self.driver.close()


if __name__ == '__main__':
    unittest.main()
