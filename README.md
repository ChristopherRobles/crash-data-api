# HW2: Crash Data RESTful API

## Project Description

This project is a RESTful backend API for analyzing crash data using Node.js, Express, MongoDB, and Mongoose. It supports full CRUD operations, filtered queries, and analytical endpoints that answer questions about the dataset.

## Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- Jest + Supertest 
- Postman

## Setup Instructions

1. Clone the repository
2. Install dependencies: npm install
3. Set up MongoDB locally
4. Create a '.env' file with your MongoDB URI: MONGO_URI=mongodb://localhost:27017/hw2db
5. Start the server: node server.js

## Folder Structure

├── controllers/
│   ├── dataController.js
│   ├── filterController.js
│   └── questionController.js
├── models/
│   └── dataModel.js
├── routes/
│   └── api.js
├── tests/
│   └── api.test.js
├── app.js
├── server.js
├── .env
├── .gitignore
└── README.md

## Testing

- unit tests written with Jest and Supertest
- Run tests: npm test
- Postman used to test all endpoints

## Analytical Endpoints

| Route | Description |
|-------|-------------|
| `/api/crashes/questions/q1` | Time of day with highest number of crashes |
| `/api/crashes/questions/q2` | Average number of vehicles per crash |
| `/api/crashes/questions/q3` | Percentage of crashes involving pedestrians |
| `/api/crashes/questions/q4` | Ward with the highest number of crashes |
| `/api/crashes/questions/q5` | Percentage of crashes in Ward 2 |
| `/api/crashes/questions/q6` | Average number of injuries per crash |
| `/api/crashes/questions/q7` | Most frequent crash location |
| `/api/crashes/questions/q8` | Number of crashes with fatalities |


## Link to GitHub repo
https://github.com/ChristopherRobles/crash-data-api