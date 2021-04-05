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
  const { username, password: plainTextPassword } = req.body

  if (!username || typeof username !== 'string') {
    return res.json({ status: 'error', error: 'Invalid username' })
  }

  if (!plainTextPassword || typeof plainTextPassword !== 'string') {
    return res.json({ status: 'error', error: 'Invalid password' })
  }

  if (plainTextPassword.length < 5) {
    return res.json({ status: 'error', error: 'Password too small. Should be at least 6 characters.' })
  }

  const password = await bcrypt.hash(plainTextPassword, 10) // Hashes the password

  try {
    const response = await User.create({
      username,
      password
    })
    console.log('User created successfully: ', response)
  } catch (error) {
      if (error.code == 11000) {
        // duplicate key
        return res.json({ status: 'error', error: 'Username already in use' })
      }
      throw error
  }
    

  res.json({ status: 'ok' })
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})