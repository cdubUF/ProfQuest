require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.error("Error connecting to MongoDB", err));

// Middleware
app.use(express.json());

// Routes
app.use('/api/professors', require('./routes/professors'));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
