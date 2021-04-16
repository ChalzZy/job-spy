const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
const { requireAuth, checkUser } = require('./middleware/authMidderware')
const MongoClient = require('mongodb').MongoClient;

const app = express();

// middleware
app.use(express.static('public'))
app.use(express.json()); // Takes any json data, parses it into js
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs')

// database connection
const dbURI = 'mongodb://localhost:27017/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err))
  console.log('Server open on localhost:3000')

// routes
app.get('*', checkUser)
app.get('/', (req, res) => res.render('home'))
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'))
app.use(authRoutes)

// job search funtionality
const url = 'mongodb+srv://jobspy:QNx1uGkz0DxAurjG@jobspy.luh0b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
app.get('/data', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbo = db.db("jobdb");
    dbo.collection("jobs").find({}).toArray(function(err, result) {
      if (err) throw err;
      res.json(result)
      db.close();
    });
  });
});
