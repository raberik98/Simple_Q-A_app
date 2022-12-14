const express = require('express');
const router = express.Router();
const userController = require("../controllers/user")

router.post('/api/register', userController.register)
router.post('/api/login', userController.login);
router.get('/api/isloggedin', userController.isLoggedIn);
router.get('/api/logout', userController.logOut);

module.exports = router;
