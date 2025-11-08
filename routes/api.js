const express = require('express');
const router = express.Router();
const { 
    createCrash, 
    getCrashes, 
    bulkInsertCrashes, 
    updateCrash, 
    deleteCrash 
} = require('../controllers/dataController');
const questionController = require('../controllers/questionController');

// Question Endpoints

// GET /api/questions/q1 - Time of day with highest number of crashes
router.get('/questions/q1', questionController.q1);
// GET /api/questions/q2 - Average number of vehicles per crash
router.get('/questions/q2', questionController.q2);
// GET /api/questions/q3 - Percentage of crashes involving pedestrians
router.get('/questions/q3', questionController.q3);
// GET /api/questions/q4 - Ward with the highest number of crashes
router.get('/questions/q4', questionController.q4);
// GET /api/questions/q5 - Percentage of crashes in Ward 2
router.get('/questions/q5', questionController.q5);
// GET /api/questions/q6 - Average number of injuries per crash
router.get('/questions/q6', questionController.q6);
// GET /api/questions/q7 - Most frequent crash location
router.get('/questions/q7', questionController.q7);
// GET /api/questions/q8 - Number of crashes with fatalities
router.get('/questions/q8', questionController.q8);


// Crash Data Endpoints

// POST /api/crashes - Create a new crash record
router.post('/', createCrash);

// GET /api/crashes - Retrieve all crash records
router.get('/', getCrashes);

// POST /api/crashes/bulk - Bulk insert crash records
router.post('/bulk', bulkInsertCrashes);

// GET /api/crashes/filter - Filter crash records based on query parameters
router.get('/filter', require('../controllers/filterController').filterCrashes);

// PUT /api/crashes/:id - Update a crash record
router.put('/:id', updateCrash);

// DELETE /api/crashes/:id - Delete a crash record
router.delete('/:id', deleteCrash);

module.exports = router;