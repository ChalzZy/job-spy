const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
const { requireAuth, checkUser } = require('./middleware/authMidderware')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()
const nodemailer = require('nodemailer')
const stripe = require('stripe')('sk_test_51IuaGBBnkafDP7Dpz1MrzuRGBZLqg9ylrzC6pHhePG8LEbqApebaAQMLPqiBY8pCE4SP3UNZypM6icUkT9D81AHE00zmXqpEED');

const app = express()

// middleware
app.use(express.static('public'))
app.use(express.json()) // Takes any json data, parses it into js
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs')

// database connection
const dbURI = 'mongodb://localhost:27017/node-auth'
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err))
console.log('Server open on localhost:3000')

// routes
app.get('*', checkUser)
app.get('/', (req, res) => res.render('home'))
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'))
app.use(authRoutes)

// job search funtionality
const url = process.env.URI;
app.get('/data', function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err
    let dbo = db.db('jobdb')
    dbo
      .collection('jobs')
      .find({})
      .toArray(function (err, result) {
        if (err) throw err
        res.json(result)
        db.close()
      })
  })
})

// report/email funtionality
var email = 'jobspyreport@gmail.com';

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: email,
    pass: process.env.PASSWORD,
  },
})

app.post('/report', (request, response) => {
  const data = request.body.url
  const userData = request.body.user
  console.log(userData + ' ' + data + ' has been reported.')
  var reportData = JSON.stringify(data)
  const date = new Date();

  var mailOptions = {
    from: 'jobspyreport@gmail.com',
    to: 'jobspyreport@gmail.com',
    subject: 'Report',
    text: userData + ' has reported ' + reportData + ' on ' + date + '.',
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
})

// Stripe payment gateway
const YOUR_DOMAIN = 'http://localhost:3000';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'nzd',
          product_data: {
            name: 'Featured Job Listing',
            images: ['https://i.imgur.com/A8c7UBN.png'],
          },
          unit_amount: 100,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/createpost`,
    cancel_url: `${YOUR_DOMAIN}/createpost`,
  });

  res.json({ id: session.id });
});