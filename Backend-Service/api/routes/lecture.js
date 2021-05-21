const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');


const LectureController = require('../controllers/lecture');


router.post('/create', LectureController.create);
router.get('/get_all', LectureController.getAll);

module.exports= router;