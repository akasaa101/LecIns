const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');


const LectureController = require('../controllers/lecture');


router.post('/create', LectureController.create);
router.get('/get_all', LectureController.getAll);
router.get('/:id', LectureController.getSingle);

router.post('/add_comment', LectureController.addComment);
router.post('/:id/add_instructor', LectureController.addInstructorToLecture)

module.exports= router;