# ProfQuest

A web application for students to find and review professors based on course availability. ProfQuest uses data from RateMyProfessors and includes a search functionality by course. It features a modern, mobile-friendly design with a blue and black theme.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Searchable course input field
- List of professors sorted by rating and difficulty
- "Would Take Again" percentages
- Links to RateMyProfessors profiles
- Responsive and mobile-friendly design

## Tech Stack

- **Frontend:** React, CSS (Flexbox for responsive design)
- **Backend:** Node.js, Express
- **Database:** MongoDB (e.g., MongoDB Atlas for cloud hosting)

## Setup

To run this project locally, follow these steps:

### Prerequisites

- Node.js and npm installed
- MongoDB URI for the database (e.g., MongoDB Atlas or a local MongoDB instance)

### Installation

#### Clone the repository:

```bash
git clone https://github.com/your-username/profquest.git
cd profquest
```

#### Backend Setup:

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the backend folder and add your MongoDB URI and port:

```plaintext
MONGO_URI=your-mongo-db-uri
PORT=4000
```

Start the backend server:

```bash
npm start
```

Your backend will run at `http://localhost:4000`.

#### Frontend Setup:

Navigate to the frontend folder:

```bash
cd ../frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the frontend folder and add the API URL for the backend:

```plaintext
REACT_APP_API_URL=http://localhost:4000
```

Start the frontend server:

```bash
npm start
```

The frontend will run at `http://localhost:3000`.

## Environment Variables

In the `.env` file for each environment (development, testing, etc.), you need to define the following:

### Backend

| Variable  | Description                       |
| --------- | --------------------------------- |
| MONGO_URI | MongoDB URI for the database      |
| PORT      | Server port (optional; defaults to 4000) |

### Frontend

| Variable            | Description                      |
| ------------------- | -------------------------------- |
| REACT_APP_API_URL   | URL for the backend API          |

## Usage

1. Visit the homepage at `http://localhost:3000` to search for professors by course.
2. Type in a course code (e.g., COP4600) and hit search.
3. View a list of professors teaching that course, with links to their RateMyProfessors profiles.

## Contributing

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature-branch-name`).
3. Commit your changes (`git commit -m "Add feature"`).
4. Push to the branch (`git push origin feature-branch-name`).
5. Open a Pull Request.
