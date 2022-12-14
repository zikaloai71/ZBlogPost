require('dotenv').config()
require('./database/connection')

const express = require('express')
const cors= require('cors')
const path = require('path')
const userRoutes = require('../routes/users.api')
const postRoutes = require('../routes/posts.api')

const app = express()

app.use(cors()) //to be able to deal with front-end.

const staticDir = path.join(__dirname, '../public')
app.use(express.static(staticDir))

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use("/user",userRoutes)
app.use("/post",postRoutes)

module.exports = app 