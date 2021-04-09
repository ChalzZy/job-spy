document.getElementById('searchBar').addEventListener('submit', userAction, false)

// Prevents page from reloading upon form submission
let form = document.getElementById("searchBar")
function handleForm(event) { event.preventDefault() } 
form.addEventListener('submit', handleForm);

function userAction() {
    let searchString = document.getElementById('userInput').value
    console.log(searchString)
    let jobText = ''

    let webhook_url =
      'https://ap-southeast-2.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/jobsearchapp-wfuox/service/jobs/incoming_webhook/getJobs'

    let url = webhook_url + '?arg=' + searchString
    console.log(url)
    fetch(url)
      .then(function (response) {
        if (!response.ok) {
          console.log(response)
          jobText += `<center><h3>Status: ${response.status}</h3></center>`
          if (response.json.length === 0)
            jobText += `<center><p>Please enter a search term.</p></center>`
          document.getElementById('results').innerHTML = jobText
          throw Error(response.statusText)
        }
        return response.json()
      })
      .then(function (jobJSON) {
        if (jobJSON['$undefined'] === true) {
          console.log('NO FETCH RESULT')
        } else {
          console.log('FETCHED RESULT... ')
          if (jobJSON.length !== 0) {
            console.log('Fetched array has ' + jobJSON.length + ' entries')
            jobText = buildJobList(jobJSON)
          } else {
            console.log('Fetched array has ' + jobJSON.length + ' entries')
            jobText += `<center><h3>No results.</h3></center>`
            jobText += `<center><p>Please try again.</p></center>`
          }
        }
        document.getElementById('results').innerHTML = jobText
      })
      .catch(function (error) {
        console.log('Error: ', error)
      })
  }

  function buildJobList(jobs) {
    let i = 0
    let jobText = ''

    for (i; i < jobs.length; i++) {
      jobText += 
        `<div style="padding-top: 20px">
            <ol class="list-group list-group mx-auto" style="max-width: 55%">
                <li class="list-group-item d-flex justify-content-between align-items-start">
                    <div class="ms-2 me-auto" style="max-width: 70%; padding-bottom: 10px">
                        <div class="fw-lighter">${jobs[i].jobTitle}</div>
                        <div class="fs-5">Company: ${jobs[i].company}</div>
                        <div class="fs-6" style="max-width: 90%; overflow: hidden; max-height: 50px">${jobs[i].summary}</div>
                        <span class="badge rounded-pill bg-primary">Tag 1</span>
                        <span class="badge rounded-pill bg-primary">Tag 2</span>
                    </div>
                    <div class="mx-2 my-auto">
                        <button type="button" class="btn btn-outline-primary">♡</button>
                        <a href="${jobs[i].link}"><button type="button" class="btn btn-primary">Apply</button></a>
                    </div>
                </li>
            </ol>
        </div>`
    /*
      jobText += `<br><p style="color:green">${jobs[i].jobTitle}</p>`
      jobText += `<p style="color:black">Company: ${jobs[i].company}</p>`
      jobText += `<p style="color:black">${jobs[i].summary}</p>`
      jobText += `<p style="color:black"><a href="${jobs[i].link}">Apply</a><br></p>`
      jobText += '<hr>'
    */
    }
    return jobText
}