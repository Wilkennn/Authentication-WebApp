const express = require("express");
const path  = require("path")

const app = express();

const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory))

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.set('view engine', 'ejs')

app.use('/', require('./Router/pages.js'))
app.use('/auth/', require('./Router/auth.js'))

app.listen(3085,()=>{
    console.log("Server started on port: 3085")
})