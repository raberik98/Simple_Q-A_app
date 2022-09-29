const express = require('express');
const router = express.Router();
const questionController = require("../controllers/question")

router.get('/api/getallquestions', questionController.getAllQuestions);
router.get('/api/getquestionsbyid/:questionId', questionController.getQuestionById);
router.post('/api/postnewquestion', questionController.postNewQuestion);
router.post('/api/editquestion/:questionId', questionController.editQuestion);
router.post('/api/deletequestion/:questionId', questionController.deleteQuestion);
router.post('/api/vote/:questionId', questionController.voteForQuestion);
router.post('/api/postnewanswer/:questionId', questionController.postNewAnswer);
router.post('/api/editanswer/:questionId', questionController.editAnswer);
router.post('/api/deleteanswer/:questionId', questionController.deleteAnswer);
router.post('/api/acceptanswer/:questionId', questionController.acceptAnswer);
router.post('/api/declineanswer/:questionId', questionController.declineAnswer);

module.exports = router;
