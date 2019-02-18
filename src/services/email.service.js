const config = require('../config')
const sendgrid = require('@sendgrid/mail')

sendgrid.setApiKey(config.sendgridkey)

exports.send = async (to, sub, body) => {
    sendgrid.send({
        to: to,
        from: 'noreply@gametod.com.br',
        subject: sub,
        html: body
    })
}