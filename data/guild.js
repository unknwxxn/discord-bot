const config = require('../config.json')
const { Schema, model } = require('mongoose');

const Guild = Schema({
    guildID: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    prefix: {
        type: String,
        default: config.prefix,
        trim: true
    }
});

module.exports = model('Guild', Guild, 'guilds');