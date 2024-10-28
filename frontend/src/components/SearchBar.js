import React, { useState } from 'react';

const validCourses = [
  "COP3502C", "COP3503C", "COP3530", "COT3100", "CDA3101", "CEN3031",
  "CIS4301", "COP4600", "CNT4007", "COP4020", "COP4533", "MAC2312",
  "ENC3246", "MAC2311", "MAC2313", "MAS3114", "PHY2048", "PHY2048L",
  "PHY2049", "PHY2049L", "STA3032"
];


const SearchBar = ({ onSearch }) => {
  const [course, setCourse] = useState('');
  const [error, setError] = useState('');

  const handleSearch = () => {
    if (validCourses.includes(course.toUpperCase())) {
      setError('');
      onSearch(course.toUpperCase());
    } else {
      setError('Invalid course code. Please try again.');
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Enter course code (e.g., COP3502C)"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        className="course-input"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default SearchBar;
