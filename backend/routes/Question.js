const express = require('express');
const router = express.Router();
const questionController = require("../controllers/question")

router.get('/api/getallquestions', questionController.getAllQuestions);
router.post('/api/postnewquestion', questionController.postNewQuestion);
router.post('/api/editquestion/:questionId', questionController.editQuestion);
router.delete('/api/deletequestion/:questionId', questionController.deleteQuestion);

module.exports = router;
