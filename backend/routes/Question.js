const express = require('express');
const router = express.Router();
const questionController = require("../controllers/question")

router.get('/api/getallquestions', questionController.getAllQuestions);

module.exports = router;
