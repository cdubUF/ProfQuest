const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  courses: { type: [String], required: true },
  rating: { type: Number, default: 0 },
  difficulty: { type: Number, default: 0 },
  wouldTakeAgain: { type: Number, default: null },
  profileLink: { type: String, unique: true, required: true },
});

const Professor = mongoose.models.Professor || mongoose.model('Professor', professorSchema);

module.exports = Professor;
