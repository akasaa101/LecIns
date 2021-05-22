const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');


const InstructorController = require('../controllers/instructor');


router.post('/create', InstructorController.create);
router.get('/get_all', InstructorController.getAll);
router.get('/get_by_name', InstructorController.getByName);
router.get('/:id', InstructorController.getSingle);
router.post('/:id/add_comment', InstructorController.addComment); 
router.post('/:id/add_lecture', InstructorController.addLecturetoInstructor);


module.exports= router;