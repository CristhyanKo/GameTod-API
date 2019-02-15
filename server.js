const express = require('express')
const mongoose = require('mongoose')
const requireDir = require('require-dir')
const cors = require('cors')

const port = (process.env.PORT || 3001)
const version = (process.env.API_VERSION || 'v1')
const prefix = `/api/${version}`

mongoose.connect('mongodb://localhost:27017/gametoddb', { useNewUrlParser: true })

const app = express()
requireDir('./src/models')

app.use(express.json())
app.use(cors())

app.use(prefix, require('./src/routes/index.route'))
app.use(`${prefix}/game`, require('./src/routes/game.route'))
app.use(`${prefix}/invite`, require('./src/routes/invite.route'))
app.use(`${prefix}/room`, require('./src/routes/room.route'))
app.use(`${prefix}/team`, require('./src/routes/team.route'))
app.use(`${prefix}/user`, require('./src/routes/user.route'))

app.use((err, req, res, next) => {
    res.send(`Error: ${err}`)
})

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