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
        required: true,
        trim: true
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

mongoose.model('User', UserSchema)