const Question = require('../models/question.js');
const userController = require('../controllers/user')


exports.getAllQuestions = () => {
    Question.find().then((questions) => {
        return res.status(200).json(questions)
    }).catch((err) => {
        console.log(err)
        return res.status(500).json({"error":"Something went wrong, please try again later."})
    })
}

exports.getQuestionById = () => {
    const _id = req.params.questionId
    Question.findOne({_id}).then((question) => {
        return res.status(200).json(questions)
    })
    .catch((err) => {
        console.log(err)
        return res.status(500).json({"error":"Question not found."})
    })
}

exports.postNewQuestion = () => {
    userId = userController.isLoggedIn()

    if (!userId) {
        const title = req.body.title
        const message = req.body.message
        if (message && title) {
            let question = new Question
            question.userId = userId
            question.title = title
            question.message = message
            question.answers = []
            question.save().then(() => {
                return res.status(200).json({"error":"Success! Your question have been successfuly posted."})
            }
            ).catch((err) => {
                console.log(err)
                return res.status(500).json({"error":"Database error, please try it again later."})
            })
        }
        else{
            return res.status(400).json({ "error": "Bad input!" });
        }
    }
    else{
        return res.status(401).json({"error":"You are unauthorized to post a new question, please log in!"})
    }
}

exports.editQuestion = () => {
    userId = userController.isLoggedIn()

    if (!userId) {
        const _id = req.params.questionId
        if (_id) {
            const newtitle = req.body.title
            const newmessage = req.body.message
            if (newmessage && newtitle) {
                Question.findOne({_id}).then((resp) => {
                    if (resp.userId == userId) {
                        Question.updateOne({_id}, {title: newtitle}, {message: newmessage}).then(() => {
                            return res.status(200).json({"error":"Success! Your question have been edited."})
                        })
                        .catch((err) => {
                            console.log(err)
                            return res.status(500).json({"error":"Database error, please try it again later."})
                        })
                    }
                    else{
                        return res.status(401).json({"error":"Only the user who asked the question have the right to edit it."})
                    }
                })
                .catch(() => {
                    return res.status(404).json({"error":"Question doesn't exist."})
                })
            }
            else{
                return res.status(400).json({ "error": "Bad input!" });
            }
        }
        else {
            return res.status(400).json({ "error": "Bad request!" });
        }
    }
    else{
        return res.status(401).json({"error":"You are unauthorized to edit this question, please log in!"})
    }
}

exports.deleteQuestion = () => {
    userId = userController.isLoggedIn()

    if (!userId) {
        const _id = req.params.questionId
        if (_id) {
            Question.findOne({_id}).then((resp) => {
                if (resp.userId == userId) {
                    Question.findByIdAndDelete({_id}).then(() => {
                        return res.status(200).json({"error":"Success! Your question have been deleted."})
                    })
                    .catch((err) => {
                        console.log(err)
                        return res.status(500).json({"error":"Database error, please try it again later."})
                    })
                }
                else{
                    return res.status(401).json({"error":"Only the user who asked the question have the right to delete it."})
                }
            })
            .catch(() => {
                return res.status(404).json({"error":"Question doesn't exist."})
            })
        }
        else {
            return res.status(400).json({ "error": "Bad request!" });
        }
    }
    else{
        return res.status(401).json({"error":"You are unauthorized to delete this question, please log in!"})
    }
}