const express = require('express')
const path = require('path')

const userRoute = require('./route/user')

const app = express()

app.set('view engine', 'ejs')

app.use('/assets', express.static(path.join(__dirname, './public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', userRoute)

const PORT = 5000
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
