const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    voteUps: [
        {
            type: String
        }
    ],
    voteDowns: [
        {
            type: String
        }
    ],
    answers: [
        {
            answeringUserId: {
                type: String
            },
            answerText: {
                type: String
            },
            isAccepted: {
                type: Boolean,
                default: false
            },
            answerDate: {
                type: Date,
                default: Date.now
            },
        }
    ]

}, { versionKey: false });

module.exports = mongoose.model('Question', questionSchema, 'questions');