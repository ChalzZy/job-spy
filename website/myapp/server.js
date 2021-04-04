const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const port = 3000

mongoose.connect('mongodb://localhost:27017/login-app-db')
app.use(express.static('public'))
app.use(bodyParser.json())

app.post('/api/register', async (req, res) => {
  console.log(req.body)
  res.json({ status: 'ok' })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})