import schedule
import time
import pymongo
import requests
from bs4 import BeautifulSoup


# Notes [testing purpose]:
# -TEMPORARILY PRINTS RESULTS TO TERMINAL INSTEAD OF INSERTING TO DB
# -TEMPORARILY EXECUTES WHEN RUN INSTEAD OF ON A SET SCHEDULE


# Connects to MongoDB.
myClient = pymongo.MongoClient('mongodb://localhost:27017/')
myDb = myClient['jobdb']
myCol = myDb['jobs']


# Dynamically modifies the TradeMe URL based on the search term.
def urlModifier(searchTerm):
    split = str.split(searchTerm)
    url = f'https://www.trademe.co.nz/a/jobs/search?search_string='
    x = 0
    while x < len(split):
        url += f'{split[x]}%20'
        x += 1
    return url


# Calls GET on the specified indeed page, and passes it to a new BeautifulSoup instnace.
def extractOne(searchTerm):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Safari/537.36'}

    r = requests.get(urlModifier(searchTerm), headers)
    soup = BeautifulSoup(r.content, 'html.parser')
    return soup


# Finds and extracts the specified information from each job-card.
def transformOne(soup):
    jobCards = soup.find_all(
        'tg-col', class_='l-col l-col--has-flex-contents ng-star-inserted')

    for listing in jobCards:
        jobTitle = listing.find(
            'div', class_='tm-jobs-search-card__title').text.strip()
        company = listing.find(
            'div', class_='tm-jobs-search-card__company').text.strip()
        summary = listing.find(
            'div', class_='tm-jobs-search-card__short-description').text.strip()
        try:
            salary = listing.find(
                'div', class_='tm-jobs-search-card__pay-benefits ng-star-inserted').text.strip()
        except:
            salary = ''
        location = listing.find(
            'div', class_='tm-jobs-search-card__location').text.strip()
        time = listing.find(
            'div', class_='tm-jobs-search-card__time').text.strip()
        link = listing.find('a').attrs['href'].strip()

        job = {'jobTitle': jobTitle, 'company': company, 'summary': summary, 'salary': salary,
               'location': location, 'time': time, 'link': f'https://trademe.co.nz/a/{link}'}
        # Inserts each dictionary (1 job) into MongoDB.
        # x = myCol.insert_one(job)
        print(job)


# Runs the extract and transform methods to fetch the data.
# def scrape():
c = extractOne('junior developer')
transformOne(c)

# Schedules the scraper to run once per day at 12:00.
'''
schedule.every().day.at("12:00").do(scrape)
while True:
    schedule.run_pending()
    time.sleep(30)
'''
