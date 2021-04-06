const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./model/user.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const port = 3000

const JWT_SECRET = 'n980y2s!@#4980ndtq398as98aq3s@#$@4ua38p9uw'

mongoose.connect('mongodb://localhost:27017/login-app-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true // Removes deprecation warning
}) 
app.use(express.static('public'))
app.use(bodyParser.json())

app.post('/api/change-password', async (req,res) => {
  const { token, newpassword: plainTextPassword } = req.body

  if (!plainTextPassword || typeof plainTextPassword !== 'string') {
    return res.json({ status: 'error', error: 'Invalid password' })
  }

  if (plainTextPassword.length < 5) {
    return res.json({ status: 'error', error: 'Password too small. Should be at least 6 characters.' })
  }

  try {
    const user = jwt.verify(token, JWT_SECRET)
    
    const _id = user.id
    
    const password = await bcrypt.hash(plainTextPassword, 10)
    
    await User.updateOne(
      { _id }, 
      {
      $set: { password }
      }
    )
    res.json({ status: 'ok' })
  } catch (error) {
    console.log(error)
    res.json({ status: 'error', error: ';))' })
  }
})

app.post('/api/login', async (req, res) => {

  const { username, password } = req.body
  const user = await User.findOne({ username }).lean()

  if (!user) {
    return res.json({ status: 'error', error: 'Invalid, username/password'})
  }

  if (await bcrypt.compare(password, user.password)) {
    // username, password combination is sucessfully

    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET)

    return res.json({ status: 'ok', data: token })
  }

  res.json ({ status: 'error', error: 'Invalid, username/password' })
})

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