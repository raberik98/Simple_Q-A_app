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
    const userId = req.body.userId
    const title = req.body.title
    const message = req.body.message

    if (!userId) {
        return res.status(401).json({"error":"You are unauthorized to post a new question, please log in!"})
    }
    if (!message || !title) {
        return res.status(400).json({ "error": "Bad input!" });
    }

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

exports.editQuestion = (req,res) => {
    const userId = req.body.userId
    const _id = req.params.questionId
    const newtitle = req.body.title
    const newmessage = req.body.message

    if (!userId) {
        return res.status(401).json({"error":"You are unauthorized to edit this question, please log in!"})
    }
    if (!_id) {
        return res.status(400).json({ "error": "Bad request!" });
    }
    if (!newmessage || !newtitle) {
        return res.status(400).json({ "error": "Bad input!" });
    }

    console.log("_id during edit: "+_id)
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

exports.deleteQuestion = (req,res) => {
    const userId = req.body.userId
    const _id = req.params.questionId
    if (!userId) {
        return res.status(401).json({"error":"You are unauthorized to delete this question, please log in!"})
    }
    if (!_id) {
        return res.status(400).json({ "error": "Bad input!" });
    }

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
exports.voteForQuestion = (req,res) => {
    const userId = req.body.userId
    const _id = req.params.questionId
    const vote = req.body.vote

    if (!userId) {
        return res.status(401).json({"error":"You are unauthorized to vote for this question, please log in!"})
    }
    if (!_id) {
        return res.status(400).json({ "error": "Bad request!" });
    }
        
    if (vote == true) {
        console.log("backend _id "+_id)
        Question.findOne({_id}).then((resp) => {
            if (resp.userId == userId) {
                return res.status(401).json({"error":"You cannot vote for your own question."})
            }

            let voteUps = resp.voteUps
            let voteDowns = resp.voteDowns

            if (voteUps.includes(userId)) {
                return res.status(401).json({"error":"You already voted for this question."})
            }
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
        })
        // .catch(() => {
        //     return res.status(404).json({"error":"Question doesn't exist."})
        // })
    }
    else if(vote == false){
        Question.findOne({_id}).then((resp) => {
            if (resp.userId == userId) {
                return res.status(401).json({"error":"You cannot vote for your own question."})
            }
            if (voteDowns.includes(userId)) {
                return res.status(401).json({"error":"You already voted for this question."})
            }
            let voteUps = resp.voteUps
            let voteDowns = resp.voteDowns
                
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
        })
        // .catch(() => {
        //     return res.status(404).json({"error":"Question doesn't exist."})
        // })
    }
    else {
        return res.status(400).json({ "error": "Bad input!" });
    }          
}
exports.postNewAnswer = (req,res) => {
    const userId = req.body.userId
    const _id = req.params.questionId
    if (!userId) {
        return res.status(401).json({"error":"You are unauthorized to delete this question, please log in!"})
    }
    Question.findOne({_id}).then((resp) => {
        let answers = resp.answers
        let newAnswer = {}
        let answerText = req.body.answer
        newAnswer.answeringUserId = userId
        newAnswer.answerText = answerText
        answers.push(newAnswer)

        Question.updateOne({_id}, {answers: answers}).then(() => {
            return res.status(200).json({"error":"Your answer have been registered."})
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).json({"error":"Database error, please try it again later."})
        })
        
    })
    .catch(() => {
        return res.status(404).json({"error":"Question doesn't exist."})
    })    
}
exports.editAnswer = (req,res) => {
    const userId = req.body.userId
    const _id = req.params.questionId
    const answerId = req.body.answerId
    const newAnswer = req.body.newAnswer
    if (!userId) {
        return res.status(401).json({"error":"You are unauthorized to delete this question, please log in!"})
    }
    Question.findOne({_id}).then((resp) => {
        let answers = resp.answers
        for (let index = 0; index < answers.length; index++) {
             if (answers[index]._id == answerId) {
                 if (answers[index].answeringUserId == userId) {
                     answers[index].answerText = newAnswer
                     Question.updateOne({_id}, {answers: answers}).then(() => {
                         return res.status(200).json({"error":"Your answer have been edited."})
                     })
                     .catch((err) => {
                         console.log(err)
                         return res.status(500).json({"error":"Database error, please try it again later."})
                     })
                 }
                 else {
                     return res.status(401).json({"error":"Only the one who posted the answer can edit it."})
                 }
             }
             else{} 
         }
         // return res.status(404).json({"error":"Couldn't find the answer."})
    })
    .catch(() => {
         return res.status(404).json({"error":"Question doesn't exist."})
    })    
}
exports.deleteAnswer = (req,res) => {
    const userId = req.body.userId
    const _id = req.params.questionId
    const answerId = req.body.answerId
    if (!userId) {
        return res.status(401).json({"error":"You are unauthorized to delete this question, please log in!"})
    }
    Question.findOne({_id}).then((resp) => {
           
        let answers = resp.answers
        let newAsnwers = []
        

       for (let index = 0; index < answers.length; index++) {
            if (answers[index]._id == answerId) {
                if (answers[index].answeringUserId != userId) {
                    return res.status(401).json({"error":"You cannot delete this answer."})
                }
            }
            else {
                newAsnwers.push(answers[index])
            }
        }
        Question.updateOne({_id}, {answers: newAsnwers}).then(() => {
            return res.status(200).json({"error":"Your answer have been deleted."})
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).json({"error":"Database error, please try it again later."})
        })
    })
    .catch(() => {
        return res.status(404).json({"error":"Question doesn't exist."})
    })
}
exports.acceptAnswer = (req,res) => {
    const userId = req.body.userId
    const _id = req.params.questionId
    const answerId = req.body.answerId
    if (!userId) {
        return res.status(401).json({"error":"You are unauthorized to delete this question, please log in!"})
    }
    Question.findOne({_id}).then((resp) => {
        if (resp.userId != userId) {
            return res.status(401).json({"error":"Only the one who asked the question can accept an answer."})
        }

        let answers = resp.answers   
        for (let index = 0; index < answers.length; index++) {
            if (answers[index]._id == answerId) {
                answers[index].isAccepted = true
            }
        }
        Question.updateOne({_id}, {answers: answers}).then(() => {
            return res.status(200).json({"error":"You successfuly accepted an answer."})
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).json({"error":"Database error, please try it again later."})
        })
    })
    .catch(() => {
        return res.status(404).json({"error":"Question doesn't exist."})
    })    
}
exports.declineAnswer = (req,res) => {
    const userId = req.body.userId
    const _id = req.params.questionId
    const answerId = req.body.answerId
    if (!userId) {
        return res.status(401).json({"error":"You are unauthorized to delete this question, please log in!"})
    }
    Question.findOne({_id}).then((resp) => {
        if (resp.userId != userId) {
            return res.status(401).json({"error":"Only the one who asked the question can accept an answer."})
        }
        let answers = resp.answers
            
        for (let index = 0; index < answers.length; index++) {
            if (answers[index]._id == answerId) {
                answers[index].isAccepted = false
            }
        }
        Question.updateOne({_id}, {answers: answers}).then(() => {
            return res.status(200).json({"error":"You successfuly accepted an answer."})
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).json({"error":"Database error, please try it again later."})
        })
    })
    .catch(() => {
        return res.status(404).json({"error":"Question doesn't exist."})
    })
}