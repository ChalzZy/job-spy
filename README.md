# JobSpy

JobSpy searches the web for software job openings and presents them in one simple to use website.


## Description

![alt text](https://i.imgur.com/X4AFZu2.png "JobSpy's home page")

JobSpy uses an advaced job scraping algoritm to find relevant jobs on popular jobseeker websites such as Seek and Trade Me. 

## Getting Started

### Dependencies

* Recent version of Windows 10 or MacOS
* Recent version of [Node.js/npm](https://nodejs.org/en/)

### Installing

#### Windows
1. Clone the repo
```
https://github.com/ChalzZy/job-spy.git
```
2. Open a terminal window at `job-spy/website/myapp`
3. Install npm packages
```
npm install
```
4. Save a `.env` file in `job-spy/website/myapp`
```
URI='your mongodb key'
EMAIL='your email'
PASSWORD='your email's password'
CAPTCHA='your captcha key'
```

#### MacOS
1. Clone the repo
```
https://github.com/ChalzZy/job-spy.git
```
2. Open a terminal window at `job-spy/website/myapp`
3. Install npm packages
```
npm install
```
4. Install bcrypt
```
npm install bcrypt
```
5. Save a `.env` file in `job-spy/website/myapp`
```
URI='your mongodb key'
EMAIL='your email'
PASSWORD='your email's password'
CAPTCHA='your captcha key'
```

> Note that MacOS installations of the Bcrypt module are not compatible with Windows and vice versa. Consider gitignoring modules.

### Executing program

1. Open a terminal window at `job-spy/website/myapp`
2. Start the server
```
npm start
```
3. Load the website
  * Enter `localhost:3000` in a browser (Chrome is recommended)
  * or Enter your local IP address in a browser for mobile devices

## Authors

* Jona Stevenson - [GitHub](https://github.com/Jona-NZ) - [LinkedIn](https://www.linkedin.com/in/jona-stevenson-nz/)

* Charles Monaghan - [GitHub](https://github.com/ChalzZy) - [LinkedIn](https://www.linkedin.com/in/charlesmonaghan/)

* Ruben Gueorguiev - [GitHub](https://github.com/blackflarez) - [LinkedIn](https://www.linkedin.com/in/ruben-gueorguiev-1bb0151b8/)

* Ranul Jayawardena - [GitHub](https://github.com/RanulJaya) - [LinkedIn](https://www.linkedin.com/in/ranul-jayawardena-278350211/)
