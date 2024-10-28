import React from 'react';

const ProfessorsList = ({ professors }) => {
  if (professors.length === 0) {
    return <p className="no-results">No professors found for the selected course.</p>;
  }

  return (
    <div className="professors-list">
      {professors.map((professor) => (
        <div className="professor-card" key={professor._id}>
          <h3>{professor.name}</h3>
          <p>Department: {professor.department}</p>
          <p>Rating: {professor.rating}</p>
          <p>Difficulty: {professor.difficulty}</p>
          <p>Would Take Again: {professor.wouldTakeAgain}%</p>
          {/* External link to the professor's profile on RateMyProfessors */}
          <a
            href={professor.profileLink}
            target="_blank"
            rel="noopener noreferrer"
            className="view-profile"
          >
            View Profile
          </a>
        </div>
      ))}
    </div>
  );
};

export default ProfessorsList;
