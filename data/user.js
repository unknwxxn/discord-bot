const { Schema, model } = require('mongoose');

const User = Schema({
    guildID: {
        type: String,
        required: true,
        index: true
    },
    userID: {
        type: String,
        required: true,
        index: true
    },
    money: {
        type: Number,
        default: 0
    },
    messages: {
        type: Number,
        default: 0
    },
    bio: {
        type: String,
        default: `Биография не установлена!`
    },
    lvl: {
        type: Number,
        default: 1
    },
    exp: {
        type: Number,
        default: 0
    },
    _time: {
        type: Number,
        default: 0
    }
});

module.exports = model('User', User, 'users');
