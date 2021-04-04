const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./model/user.js')
const bcrypt = require('bcryptjs')
const port = 3000

mongoose.connect('mongodb://localhost:27017/login-app-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true // Removes deprecation warning
}) 
app.use(express.static('public'))
app.use(bodyParser.json())

app.post('/api/register', async (req, res) => {
  console.log(req.body)

  const { username, password: plainTextPassword } = req.body

  const password = await bcrypt.hash(password, 10) // Hashes the password

  

  res.json({ status: 'ok' })
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})