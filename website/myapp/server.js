const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
const { requireAuth, checkUser } = require('./middleware/authMidderware')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()
const nodemailer = require('nodemailer')
const stripe = require('stripe')(
    'sk_test_51IuaGBBnkafDP7Dpz1MrzuRGBZLqg9ylrzC6pHhePG8LEbqApebaAQMLPqiBY8pCE4SP3UNZypM6icUkT9D81AHE00zmXqpEED'
)

// Use body-parser to retrieve the raw body as a buffer
const bodyParser = require('body-parser');
const app = express()

// Middleware
app.use('/testjs', express.static('testjs'))
app.use(express.static('public'))
// Takes any json data, parses it into js
app.use((req, res, next) => {
    if (req.originalUrl.startsWith('/webhook')) {
        next();
    } else {
        express.json()(req, res, next);
    }
});


app.use(cookieParser())

// Views the engine
app.set('view engine', 'ejs')

// Database connection
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

// Routes
app.get('*', checkUser)
app.get('/', (req, res) => res.render('home'))
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'))
app.use(authRoutes)

// Job search funtionality
const url = process.env.URI
app.get('/featured', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err
        let dbo = db.db('jobdb')
        dbo.collection('featured')
            .find({})
            .toArray(function (err, result) {
                if (err) throw err
                res.json(result)
                db.close()
            })
    })
})
app.get('/data', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err
        let dbo = db.db('jobdb')
        dbo.collection('jobs')
            .find({})
            .toArray(function (err, result) {
                if (err) throw err
                res.json(result)
                db.close()
            })
    })
})

// Report/email funtionality

// Email settings
var email = 'jobspyreport@gmail.com'

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: email,
        pass: process.env.PASSWORD,
    },
})

// Emails jobspyreport@gmail.com after getting the post request containing the data
app.post('/report', (request, response) => {
    const data = request.body.url
    const userData = request.body.user
    console.log(userData + ' ' + data + ' has been reported.')
    var reportData = JSON.stringify(data)
    const date = new Date()

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
const endpointSecret = 'whsec_97Nz8euCuBNPj2le70PhFYsqOK0a0qSE';

const YOUR_DOMAIN = 'http://localhost:3000'

let jobData = ''

app.post('/sendJobData', (request, response) => {
    jobData = request.body
    console.log('Sent job data: ' + jobData)
})


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
        //TODO: Add success and failure pages
        success_url: `${YOUR_DOMAIN}/`,
        cancel_url: `${YOUR_DOMAIN}/createpost`,
    })

    res.json({ id: session.id })
})

const fulfillOrder = (session) => {
    console.log("Fulfilling order", session);

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("jobdb");
        //Job listings in the database are set to expire after 1 month (2,629,746 seconds)
        //dbo.collection("featured").dropIndex( { "createdAt": 1 } )
        //dbo.collection("featured").createIndex({ "createdAt": 1 }, { expireAfterSeconds: 2629746 })

        dbo.collection("featured").insertOne({
            "createdAt": new Date(),
            jobData
        })
        try {
            dbo.collection("featured").find().sort({ "createdAt": -1 })
        }
        catch (err) {
            console.log(err.message)
        }

    });
}

const createOrder = (session) => {
    // TODO: fill me in
    console.log("Creating order", session);
}

const emailCustomerAboutFailedPayment = (session) => {
    // TODO: fill me in
    console.log("Emailing customer", session);
}

app.post('/webhook', bodyParser.raw({ type: 'application/json' }), (request, response) => {
    const payload = request.body;
    const sig = request.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
        console.log(err.message)
        return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
        case 'checkout.session.completed': {
            const session = event.data.object;
            // Save an order in database, marked as 'awaiting payment'
            createOrder(session);

            // Check if the order is paid (e.g., from a card payment)
            //
            // A delayed notification payment will have an `unpaid` status, as
            // you're still waiting for funds to be transferred from the customer's
            // account.
            if (session.payment_status === 'paid') {
                fulfillOrder(session);
            }

            break;
        }

        case 'checkout.session.async_payment_succeeded': {
            const session = event.data.object;
            // Fulfills the purchase
            fulfillOrder(session);
            break;
        }

        case 'checkout.session.async_payment_failed': {
            const session = event.data.object;
            // TODO: send an email to the customer asking them to retry their order
            break;
        }
    }

    response.status(200);
});