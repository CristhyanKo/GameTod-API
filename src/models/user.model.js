const express = require('express')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    nick: {
        type: String,
        required: true
    },
    avatar: String, 
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    friends: [{
        userId: mongoose.Schema.Types.ObjectId,
        nick: {
            type: String,
            required: true
        },
        avatar: String
    }]
})

mongoose.model('User', UserSchema)