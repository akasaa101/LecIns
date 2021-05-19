const express = require('express');
const router = express.Router();


const UserController = require('../controllers/user');

router.post('/signup', UserController.userCreate);
router.post('/login', UserController.userLogin);
router.post('/logout', UserController.userLogout);

module.exports= router;