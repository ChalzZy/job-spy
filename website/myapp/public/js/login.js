// Finds regististration form in 
const form = document.getElementById('login')
// Waits until the submit button is clicked
form.addEventListener('submit', login)

async function login(event) {
    event.preventDefault() // Prevents page from being reset when form is clicked
    const username = document.getElementById('floatingInput').value
    const password = document.getElementById('floatingPassword').value

    // 'POST' request to the server
    const result = await fetch('/api/login', {
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
        console.log('Got the token: ', result.data)
        localStorage.setItem('token', result.data)
        alert('Successfully logged in. Click OK to return to home screen.')
        window.location.assign("/index.html")
    } else {
        alert(result.error)
    }
}