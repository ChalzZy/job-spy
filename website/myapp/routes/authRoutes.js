const { Router } = require('express')
const authController = require('../controllers/authController')

const router = Router()

// registration
router.get('/signup', authController.signup_get)
router.post('/signup', authController.signup_post)
router.get('/confirmation/:email/:token', authController.confirmEmail)
router.get('/yougotmail', authController.yougotmail_get)

// login
router.get('/login', authController.login_get)
router.post('/login', authController.login_post)
router.get('/loginverified', authController.loginverified_get)

// logout
router.get('/logout', authController.logout_get)

// job search
router.get('/jobsearch', authController.jobsearch_get)

//settings
router.get('/settings', authController.settings_get_page)

// profile page
router.get('/profile', authController.profile_get)
router.post('/profile', authController.profile_post)
router.delete('/delete', authController.profile_delete)

// change email
router.post('/email', authController.email_post)

// change password
router.get('/password', authController.password_get)
router.post('/password', authController.password_post)

// about us
router.get('/aboutus', authController.aboutus_get)

// post listing
router.get('/postlisting', authController.postlisting_get)

// create post
router.get('/createpost', authController.createpost_get)

module.exports = router
