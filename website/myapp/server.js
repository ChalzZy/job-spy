const express = require('express')
const path = require('path')
const port = 9999

const app = express()
app.use('/', express.static(path.join(__dirname, 'static')))

app.listen(port, () => {
    console.log('Server up at ${port}')
})