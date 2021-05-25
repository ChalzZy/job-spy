const { Router } = require('express')
const authController = require('../controllers/authController')
const router = Router()
const cors = require('cors')

// registration
router.get('/signup', authController.signup_get)
router.post('/signup', authController.signup_post)

// login
router.get('/login', authController.login_get)
router.post('/login', authController.login_post)

// LinkedIn OAuth
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }


router.get('/auth/linkedin/callback', cors(corsOptions), authController.linkedin_get)
router.post('/oauth/v2/accessToken', authController.linkedin_post)

// logout
router.get('/logout', authController.logout_get)

// job search
router.get('/jobsearch', authController.jobsearch_get)

// profile page
router.get('/profile', authController.profile_get)

// change password
router.get('/password', authController.password_get)
router.post('/password', authController.password_post)

// about us
router.get('/aboutus', authController.aboutus_get)

module.exports = router;