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

    def test_job_search(self):
        driver = self.driver

        # Find & input 'developer' into the search bar
        driver.find_element_by_id('userInput').send_keys('.net')
        time.sleep(1)

        # Select 'Auckland' from the location drop down menu
        selectLocation = driver.find_element_by_id('location-selection')
        for option in selectLocation.find_elements_by_tag_name('option'):
            if option.text == 'Auckland':
                option.click()
                break

        time.sleep(1)

        # Select 'Intermediate' from the intermediate drop down menu
        selectCategory = driver.find_element_by_id('category-selection')
        for option in selectCategory.find_elements_by_tag_name('option'):
            if option.text == 'Intermediate':
                option.click()
                break

        time.sleep(1)
        driver.find_element_by_id('searchButton').click()

        # Test that correct URL is being generated based on search
        self.assertEqual('http://localhost:3000/jobsearch?search=.net&page=1&location=Auckland&category=Intermediate',
                         driver.current_url, 'URL Error - Not As Expected')

    def tearDown(self):
        time.sleep(5)
        self.driver.close()


if __name__ == '__main__':
    unittest.main()
