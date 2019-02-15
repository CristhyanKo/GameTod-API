const express = require('express')
const mongoose = require('mongoose')
const requireDir = require('require-dir')
const port = (process.env.PORT || 3001)
const version = (process.env.API_VERSION || 'v1')

mongoose.connect('mongodb://localhost:27017/gametoddb', { useNewUrlParser: true })

const app = express()
requireDir('./src/models')

app.use(express.json())
app.use(`/api/${version}`, require('./src/routes/index.route'))





app.listen(port, () => {
    console.log(
`
------------------------------------
Server listening on port:\x1b[33m ${port}

\x1b[0mURL:\x1b[32m http://localhost:${port} \x1b[0m
------------------------------------
`
    )
})