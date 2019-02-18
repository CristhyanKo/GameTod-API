const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const requireDir = require('require-dir')
const cors = require('cors')
const config = require('./config')

mongoose.connect(config.connectionString, { useNewUrlParser: true })

const app = express()
requireDir('./models')

app.use(bodyParser.json({
    limit: '5mb'
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use(config.apiPrefix, require('./routes/index.route'))


app.use(`${config.apiPrefix}/game`, require('./routes/game.route'))
app.use(`${config.apiPrefix}/invite`, require('./routes/invite.route'))
app.use(`${config.apiPrefix}/room`, require('./routes/room.route'))
app.use(`${config.apiPrefix}/team`, require('./routes/team.route'))
app.use(`${config.apiPrefix}/user`, require('./routes/user.route'))

app.use((err, req, res, next) => {
    res.json({ error: err })
})

app.listen(config.apiPort, () => {
    console.log(
        `
------------------------------------
Server listening on port:\x1b[33m ${config.apiPort}

\x1b[0mURL:\x1b[32m http://localhost:${config.apiPort} \x1b[0m
------------------------------------
`
    )
})