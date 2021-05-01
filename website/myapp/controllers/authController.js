const User = require('../models/User')
const userFavourites = require('../models/userFavourites')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const SECRET = 'nw8d395d243nj8h90!@#*&!)@(#*0wnp9m8edruq2o98i5'


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
        return errors;
    }

    // Validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message 
        })
    }

    return errors
}

const maxAge = 3 * 24 * 60 * 60 // 3 days
const createToken = (id) => {
  return jwt.sign({ id }, SECRET, {
    expiresIn: maxAge
  }) // signs JWT
}

module.exports.signup_get = (req, res) => {
  res.render('signup');
}

module.exports.login_get = (req, res) => {
  res.render('login');
}


module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;


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
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password)
    const token = createToken(user._id)
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
    res.status(200).json({ user: user._id })
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
  res.render('jobsearch');
}

module.exports.profile_get = (req, res) => {
  res.render('profile', {data:req.body});
}

module.exports.password_get = (req, res) => {
  res.render('password');
}

module.exports.profile_post = (req, res) => {
  // var prof = userFavourites(req.body).save(function(err,data){
  //   if(err) throw err

  //   res.json(data)

  // // })

  res.json(req.body)


}

module.exports.password_post = async (req, res) => {
  const { email, password } = req.body
  
  try {
    const newPassword = await bcrypt.hash(password, 10)

    query = { email: email }
    newValue = { $set: {password: newPassword }}

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

