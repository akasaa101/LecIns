const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');


const LectureController = require('../controllers/lecture');

router.get('/get_all', checkAuth, LectureController.getAll);

module.exports= router;