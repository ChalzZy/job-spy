import pymongo
import requests
from bs4 import BeautifulSoup


# Connects to MongoDB.
myClient = pymongo.MongoClient('URI_HERE')
myDb = myClient['jobdb']
myCol = myDb['jobs']


# Dynamically modifies the TradeMe URL based on the search term.
def urlModifier(searchTerm, numOfPages):
    split = str.split(searchTerm)
    url = f'https://nz.indeed.com/jobs?q='
    x = 0
    while x < len(split):
        url += f'{split[x]}+'
        x += 1
    print(url + f'&l=New+Zealand&sort=date&start={numOfPages}\n')
    return url + f'&l=New+Zealand&sort=date&start={numOfPages}'


# Calls GET on the specified indeed page, and passes it to a new BeautifulSoup instnace.
def extractOne(searchTerm, numOfPages):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Safari/537.36'}
    r = requests.get(urlModifier(searchTerm, numOfPages), headers)
    soup = BeautifulSoup(r.content, 'html.parser')
    return soup


# Finds and extracts the specified information from each job-card.
def transformOne(soup):
    jobCards = soup.find_all('div', class_='jobsearch-SerpJobCard')

    for listing in jobCards:
        try:
            jobTitle = listing.find('a').text.strip()
        except:
            jobTitle = ''
        try:
            company = listing.find('span', class_='company').text.strip()
        except:
            company = ''
        try:
            salary = listing.find('span', class_='salaryText').text.strip()
        except:
            salary = ''
        try:
            summary = listing.find(
                'div', class_='summary').text.strip().replace('\n', '')
        except:
            summary = ''
        try:
            location = listing.find(
                'span', class_='location accessible-contrast-color-location').text.strip()
        except:
            location = ''
        try:
            time = listing.find('span', class_='date date-a11y').text.strip()
        except:
            time = ''
        link = listing.find('a').attrs['href'].strip()

        job = {'jobTitle': jobTitle, 'company': company,
               'summary': summary, 'salary': salary, 'location': location, 'time': time,
               'link': f'https://nz.indeed.com{link}'}
        # Inserts each dictionary (1 job) into MongoDB.
        x = myCol.insert_one(job)


# Runs the extract and transform methods to fetch the data, for 4 pages of the website.
for i in range(0, 50, 10):
    print(f'Scraping page {i}')
    c = extractOne('software developer', i)
    transformOne(c)
    print('\n\n')
