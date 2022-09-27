const User = require('../models/user.js');
const Question = require('../models/question.js');
const userController = require('../controllers/user')


exports.getAllQuestions = () => {
    Question.find().then(questions => {
        return res.status(200).json(questions)
    }).catch(() => {
        return res.status(500).json({"error":"Something went wrong, please try again later."})
    })
}

