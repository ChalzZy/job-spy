const { Router } = require('express')
const authController = require('../controllers/authController')

const router = Router()

// registration
router.get('/signup', authController.signup_get)
router.post('/signup', authController.signup_post)

// login
router.get('/login', authController.login_get)
router.post('/login', authController.login_post)

// logout
router.get('/logout', authController.logout_get)

// job search
router.get('/jobsearch', authController.jobsearch_get)

// profile page
router.get('/profile', authController.profile_get)

// change password
router.get('/password', authController.password_get)
router.post('/password', authController.password_post)


module.exports = router;