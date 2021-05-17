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
        driver.find_element_by_id('userInput').send_keys('developer')
        time.sleep(1)

        # Select 'Your Location' from the location drop down menu
        selectLocation = driver.find_element_by_id('location-selection')
        for option in selectLocation.find_elements_by_tag_name('option'):
            if option.text == 'Your Location':
                option.click()
                break

        time.sleep(1)

        # Select 'Intermediate' from the intermediate drop down menu
        selectCategory = driver.find_element_by_id('category-selection')
        for option in selectCategory.find_elements_by_tag_name('option'):
            if option.text == 'Junior':
                option.click()
                break

        driver.find_element_by_id('searchButton').click()
        self.assertEqual('http://localhost:3000/jobsearch?search=developer&page=1&location=Your%20Location&category=Junior',
                         driver.current_url, 'URL Error - Not As Expected')

        time.sleep(5)

        # Test that users location is being pulled & searched with successfully
        expectedLocation = driver.find_element_by_id(
            'locationDisplay').text.strip()
        self.assertEqual('Detected Location: Auckland',
                         expectedLocation, 'Location Error - Not As Expected')

    def tearDown(self):
        time.sleep(5)
        self.driver.close()


if __name__ == '__main__':
    unittest.main()
