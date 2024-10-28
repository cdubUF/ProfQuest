const express = require('express');
const router = express.Router();
const { getAllProfessors, getProfessorsByCourse } = require('../controllers/professorController');

// Route to get all professors
router.get('/', getAllProfessors);

// Route to get professors by course
router.get('/search', getProfessorsByCourse);

module.exports = router;
