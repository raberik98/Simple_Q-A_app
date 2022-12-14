const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: 
    {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    password: 
    {
        type: String,
        required: true
    },
    session: {
        type: String,
        default: "11"
    }
}, { versionKey: false });

module.exports = mongoose.model('User', userSchema, 'users');
// név, séma, kollekció
