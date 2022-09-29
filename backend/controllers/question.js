const Question = require('../models/question.js');
const userController = require('../controllers/user')


exports.getAllQuestions = (req,res) => {
    Question.find().then((questions) => {
        return res.status(200).json(questions)
    }).catch((err) => {
        console.log(err)
        return res.status(500).json({"error":"Something went wrong, please try again later."})
    })
}

exports.getQuestionById = (req,res) => {
    const _id = req.params.questionId
    Question.findOne({_id}).then((questions) => {
        return res.status(200).json(questions)
    })
    .catch((err) => {
        console.log(err)
        return res.status(500).json({"error":"Question not found."})
    })
}

exports.postNewQuestion = (req,res) => {
    userId = req.body.userId

    if (userId) {
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

exports.editQuestion = (req,res) => {
    userId = req.body.userId

    if (userId) {
        const _id = req.params.questionId
        if (_id) {
            console.log("_id during edit: "+_id)
            const newtitle = req.body.title
            const newmessage = req.body.message
            if (newmessage && newtitle) {
                Question.findOne({_id}).then((resp) => {
                    if (resp.userId == userId) {
                        Question.updateOne({_id}, {title: newtitle, message: newmessage}).then(() => {
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

exports.deleteQuestion = (req,res) => {
    userId = req.body.userId

    if (userId) {
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
            return res.status(400).json({ "error": "Bad input!" });
        }
    }
    else{
        return res.status(401).json({"error":"You are unauthorized to delete this question, please log in!"})
    }
}
exports.voteForQuestion = (req,res) => {
    userId = req.body.userId

    if (userId) {
        const _id = req.params.questionId
        if (_id) {
        const vote = req.body.vote
            if (vote == true) {
                console.log("backend _id "+_id)
                Question.findOne({_id}).then((resp) => {
                    if (resp.userId != userId) {
                        let voteUps = resp.voteUps
                        let voteDowns = resp.voteDowns

                        if (!voteUps.includes(userId)) {
                            let newVoteDowns = []
                            if (voteDowns.includes(userId)) {
                                newVoteDowns = voteDowns.filter((value) => {
                                    return value != userId
                                })
                            }
                            else {
                                newVoteDowns = voteDowns
                            }

                            voteUps.push(userId)

                            Question.updateOne({_id}, {voteUps: voteUps, voteDowns: newVoteDowns}).then(() => {
                                return res.status(200).json({"error":"Your vote have been registered."})
                            })
                            .catch((err) => {
                                console.log(err)
                                return res.status(500).json({"error":"Database error, please try it again later."})
                            })
                        } else {
                            return res.status(401).json({"error":"You already voted for this question."})
                        }
                    }
                    else{
                        return res.status(401).json({"error":"You cannot vote for your own question."})
                    }
                })
                // .catch(() => {
                //     return res.status(404).json({"error":"Question doesn't exist."})
                // })
            }
            else if(vote == false){
                Question.findOne({_id}).then((resp) => {
                    if (resp.userId != userId) {
                        let voteUps = resp.voteUps
                        let voteDowns = resp.voteDowns
                        if (!voteDowns.includes(userId)) {
                            let newVoteUps = []
                            if (voteUps.includes(userId)) {
                                newVoteUps = voteUps.filter((value) => {
                                    return value != userId
                                })
                            }
                            else {
                                newVoteUps = voteUps
                            }

                            voteDowns.push(userId)

                            Question.updateOne({_id}, {voteUps: newVoteUps, voteDowns: voteDowns}).then(() => {
                                return res.status(200).json({"error":"Your vote have been registered."})
                            })
                            .catch((err) => {
                                console.log(err)
                                return res.status(500).json({"error":"Database error, please try it again later."})
                            })
                        } else {
                            return res.status(401).json({"error":"You already voted for this question."})
                        }
                    }
                    else{
                        return res.status(401).json({"error":"You cannot vote for your own question."})
                    }
                })
                // .catch(() => {
                //     return res.status(404).json({"error":"Question doesn't exist."})
                // })
            }
            else {
                return res.status(400).json({ "error": "Bad input!" });
            }
        }
        else {
            return res.status(400).json({ "error": "Bad request!" });
        }
    }
    else{
        return res.status(401).json({"error":"You are unauthorized to vote for this question, please log in!"})
    }
}