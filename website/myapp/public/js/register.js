// Finds regististration form in 
const form = document.getElementById('reg-form')
// Waits until the submit button is clicked
form.addEventListener('submit', registerUser)

async function registerUser(event) {
    event.preventDefault() // Prevents page from being reset when form is clicked
    const username = document.getElementById('floatingInput').value
    const password = document.getElementById('floatingPassword').value

    // 'POST' request to the server
    const result = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username, 
            password
        })
    }).then((res) => res.json())

    if(result.status === 'ok') {
        alert('Account created successfully. Click OK to goto sign-in')
        window.location.assign("/sign-in.html") // Redirect to sign-in page
    } else {
        alert(result.error)
    }
}