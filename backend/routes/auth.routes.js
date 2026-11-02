const express = require('express')
const router = express.Router()
const validateMiddleware = require('../middleware/validation.middleware')
const registerSchema = require('../validator/auth.validator')
const authController = require('../controller/auth.controller')


router.post('/register',validateMiddleware(registerSchema), authController.register)

module.exports = router