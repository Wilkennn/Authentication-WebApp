const express = require('express')
const router = express.Router()

router.get("/", (req,res) => {
    res.render('login')
})

router.get("/register", (req,res) => {
    res.render('register')
})

router.get("/recover", (req,re) => {
    res.render('recover')
})

module.exports = router