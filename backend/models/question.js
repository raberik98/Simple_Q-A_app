const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    userId: {
        type: Number,
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
    voteUps: {
        type: Number,
    },
    voteDowns: {
        type: Number,
    },
    answers: [
        {
            answeringUserId: {
                type: Number
            },
            answerText: {
                type: String
            },
            isAccepted: {
                type: Boolean,
                default: false
            }
        }
    ]

}, { versionKey: false });

module.exports = mongoose.model('Question', questionSchema, 'questions');