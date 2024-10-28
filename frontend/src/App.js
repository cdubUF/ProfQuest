import React, { useState } from 'react';
import axios from 'axios';
import ProfessorsList from './components/ProfessorsList';
import SearchBar from './components/SearchBar';
import './index.css';

const App = () => {
  const [professors, setProfessors] = useState([]);

  const handleSearch = async (course) => {
    try {
      const response = await axios.get(`/api/professors/search?course=${course}`);
      setProfessors(response.data);
    } catch (error) {
      console.error('Error fetching professors:', error);
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">ProfQuest</h1>
      <SearchBar onSearch={handleSearch} />
      <ProfessorsList professors={professors} />
    </div>
  );
};

export default App;
