const express = require('express')
const authController = require('../Controller/authController.js')
const router = express.Router()

router.post("/register", authController.register)

router.post("/login", authController.login)

// router.post("/recover", authController.recoverPassword)

module.exports = router