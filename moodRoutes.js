// routes/moodRoutes.js
const express = require('express');
const router = express.Router();
const { suggestMusic, getMoodHistory, deleteMoodHistory } = require('../controllers/moodController');

// POST route to get suggestions based on mood
//router.post('/', getSuggestionByMood);

// POST /api/mood  — Mood suggestion + store mood
router.post('/', suggestMusic);

// GET /api/mood/history?email=someone@example.com — Fetch mood history
router.get('/history', getMoodHistory);

router.delete('/history', deleteMoodHistory);


module.exports = router;
