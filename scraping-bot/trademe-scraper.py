import schedule
import time
import pymongo
import requests
from bs4 import BeautifulSoup


# Notes [testing purpose]:
# TEMPORARILY PRINTS RESULTS TO TERMINAL INSTEAD OF DB
# TEMPORARILY EXECUTES WHEN RUN


# Connects to MongoDB.
myClient = pymongo.MongoClient('mongodb://localhost:27017/')
myDb = myClient['jobdb']
myCol = myDb['jobs']


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
