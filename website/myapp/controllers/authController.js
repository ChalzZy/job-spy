const User = require('../models/User')
const jwt = require('jsonwebtoken')
const userFavourites = require('../models/userFavourites')
const bcrypt = require('bcrypt')
const fetch = require('node-fetch')
const { stringify } = require('querystring')
const SECRET = 'nw8d395d243nj8h90!@#*&!)@(#*0wnp9m8edruq2o98i5'
require('dotenv').config()
const captchaSecretKey = process.env.CAPTCHA

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = { email: '', password: '' }

    // incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'that email is not registered'
    }

    // incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'that password is incorrect'
    }

    // duplicate error code
    if (err.code === 11000) {
        errors.email = 'that email is already registered'
        return errors
    }

    // Validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }

    return errors
}

const maxAge = 3 * 24 * 60 * 60 // 3 days
const createToken = (id) => {
    return jwt.sign({ id }, SECRET, {
        expiresIn: maxAge,
    }) // signs JWT
}

module.exports.signup_get = (req, res) => {
    res.render('signup')
}

module.exports.login_get = (req, res) => {
    res.render('login')
}

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.create({ email, password })
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(201).json({ user: user._id })
    } catch (error) {
        const errors = handleErrors(error)
        res.status(400).json({ errors })
    }
}

module.exports.login_post = async (req, res) => {
    const { email, password, captcha } = req.body

    if (!req.body.captcha) {
        return res.json({ success: false, msg: 'Please select captcha' })
    }

    const query = stringify({
        secret: captchaSecretKey,
        response: req.body.captcha,
        remoteip: req.connection.remoteAddres
    })
    const verifyURL = `https://google.com/recaptcha/api/siteverify?${query}`

    const body = await fetch(verifyURL).then(res => res.json())

    if (body.success !== undefined && !body.success) {
        return res.json({ success: false, msg: 'Failed captcha verification' })
    }


    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(200).json({ user: user._id })
        //res.json({ success: true, msg: 'Captcha passed' })
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 }) // logs user out
    res.redirect('/') // return to homepage
}

module.exports.jobsearch_get = (req, res) => {
    res.render('jobsearch')
}

module.exports.profile_get = (req, res) => {
    var user_email = false

    if (res.cookie()) {
        user_email = true
    }
    if (user_email) {
        var fav = userFavourites.find({})
        fav.exec(function (err, data) {
            if (err) throw err
            res.render('profile', {
                title: 'Favourites Records',
                userdata: data,
                users_email: res.cookie().locals.user.email,
            })
        })
    } else {
        res.send('Page not Found')
    }
}

//settings
module.exports.settings_get_page = (req, res) => {
    res.render('settings', { user_email: res.cookie().locals.user.email })
}

module.exports.profile_delete = async (req, res) => {
    const {
        _id,
        id,
        jobTitle,
        company,
        summary,
        salary,
        locations,
        time,
        link,
        email,
    } = req.body

    console.log(_id)
    try {
        const favData = await userFavourites.findByIdAndDelete({ _id })
        res.json({ redirect: '/profile' })

        console.log('deleted data')
    } catch (error) {
        const errors = handleErrors(error)
        res.status(400).json({ errors })
    }
}

module.exports.profile_post = async (req, res) => {
    const {
        id,
        jobTitle,
        company,
        summary,
        salary,
        locations,
        time,
        link,
        email,
    } = req.body

    try {
        const favData = await userFavourites.create({
            id,
            jobTitle,
            company,
            summary,
            salary,
            locations,
            time,
            link,
            email,
        })
        res.json(
            id,
            jobTitle,
            company,
            summary,
            salary,
            locations,
            time,
            link,
            email
        )
    } catch (error) {
        const errors = handleErrors(error)
        res.status(400).json({ errors })
    }
}

module.exports.password_get = (req, res) => {
    res.render('password')
}

module.exports.aboutus_get = (req, res) => {
    res.render('aboutus')
}

module.exports.postlisting_get = (req, res) => {
    res.render('postlisting')
}

module.exports.createpost_get = (req, res) => {
    res.render('createpost')
}

module.exports.password_post = async (req, res) => {
    const { email, password } = req.body

    try {
        const newPassword = await bcrypt.hash(password, 10)

        query = { email: email }
        newValue = { $set: { password: newPassword } }

        await User.updateOne(query, newValue)

        //res.json({ status: 'ok' })
        console.log(email + ' password changed successfully!')

        res.cookie('jwt', '', { maxAge: 1 }) // logs user out
        res.status(200).json({ isPasswordChanged: true })
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}
