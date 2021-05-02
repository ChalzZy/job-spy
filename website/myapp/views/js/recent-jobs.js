{
    /**
     * Populates the job list with most recent jobs from DB
     */
    async function listRecentJobs() {
        const response = await fetch('/data');
        let jobList = '';

        const data = await response.json();
        
        const numOfJobsToDisplay = 4;
        for (i = 0; i < numOfJobsToDisplay; i++) {
            jobList += `
            <div style="padding-top: 10px">
                <li class="list-group-item d-flex justify-content-between align-items-start">
                    <div class="ms-2 me-auto" style="max-width: 70%;">
                        <div class="fw-lighter" id="job-title">${data[i].company}</div>
                        <div class="fs-5">${data[i].jobTitle}</div>
                        <div class="fs-6" style="max-width: 90%; overflow: hidden; max-height: 50px">${data[i].summary}</div>
                        <span class="badge rounded-pill bg-primary">Tag 1</span>
                        <span class="badge rounded-pill bg-primary">Tag 2</span>
                    </div>
                    <div class="mx-2 my-auto">
                        <button type="button" class="btn btn-outline-primary">♡</button>
                        <a href="${data[i].link}"><button type="button" class="btn btn-primary">Apply</button></a>
                    </div>
                </li>
            </div>
            `;
        }

        document.getElementById('results').innerHTML = jobList
    }

    listRecentJobs();
}
