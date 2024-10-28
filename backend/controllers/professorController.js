const Professor = require('../models/Professor');

// Get all professors from the database
const getAllProfessors = async (req, res) => {
  try {
    const professors = await Professor.find();
    res.status(200).json(professors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch professors' });
  }
};

// Get professors by course
const getProfessorsByCourse = async (req, res) => {
  const { course } = req.query;
  try {
    const professors = await Professor.find({ courses: course })
      .sort({ rating: -1 }) // sort by rating in descending order
      .limit(10); // return top 10 professors
    res.status(200).json(professors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch professors by course' });
  }
};

module.exports = {
  getAllProfessors,
  getProfessorsByCourse,
};
