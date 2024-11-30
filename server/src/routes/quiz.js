const express = require('express');
const router = express.Router();
const Quiz = require('../models/quizModel');

// Get All Quizzes
router.get('/quizzes', async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Attempt a Quiz
router.post('/quizzes/:id/attempt', async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

        const { answers } = req.body; // Array of user-selected answers
        let score = 0;

        quiz.questions.forEach((q, index) => {
            if (answers[index] === q.correctAnswer) score++;
        });

        res.json({ score });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/quizzes', async (req, res) => {
    try {
        const { title, description, questions } = req.body;
        // Validate required fields
        if (!title || !description || !questions || !Array.isArray(questions)) {
            return res.status(400).json({ error: 'Invalid input data' });
            }
            // Create and save quiz
        const newQuiz = new Quiz({ title, description, questions });
        const savedQuiz = await newQuiz.save();

        res.status(201).json(savedQuiz); // Return the saved quiz
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create quiz' });
    }
});


module.exports = router;