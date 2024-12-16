const express = require("express");
const router = express.Router();
const Quiz = require("../models/quizModel");
const QuizResponse = require("../models/quizResponseModel");
const { validateUser } = require("../user/auth");

// Get All Public Quizzes
router.get("/quizzes", async (req, res) => {
  try {
    const quizzes = await Quiz.find({ "settings.isPublic": true }).populate("creator", "name email");
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a New Quiz
router.post("/quizzes", validateUser, async (req, res) => {
  try {
    // console.log(req.body);
    const { title, description, questions = [], status, settings } = req.body;
   
    if (!title || !description || !Array.isArray(questions)) {
      return res.status(400).json({ error: "Invalid input data" });
    }
    const newQuiz = new Quiz({
      title,
      description,
      questions,
      status,
      settings,
      creator: req.user._id,
    });

    const savedQuiz = await newQuiz.save();
    req.user.quizzesCreated.push(savedQuiz._id);
    await req.user.save();

    res.status(201).json(savedQuiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//update a quiz
router.put("/quizzes/:id", validateUser, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });
    if (quiz.creator.toString() !== req.user._id.toString() && req.user.role !== 1) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const updatedQuiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedQuiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete quiz endpoint
router.delete('/quizzes/:id', validateUser, async (req, res) => {
  try {
    const quizId = req.params.id;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Check if the createdBy field is defined
    if (!quiz.creator) {
      return res.status(400).json({ message: 'Quiz does not have a creator' });
    }

    // Check if the user is the owner of the quiz or an admin
    if (!quiz.creator.equals(req.user._id) && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await quiz.deleteOne();
    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error('Error deleting quiz:', error);
    res.status(500).json({ message: 'Error deleting quiz' });
  }
});


// Attempt a Quiz
router.post("/quizzes/:id/attempt", validateUser, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });

    const { answers } = req.body; // Object of user-selected answers
    let score = 0;
    const responseAnswers = [];

    // Validate the answers and calculate the score
    quiz.questions.forEach((q) => {
      const selectedOption = answers[q._id.toString()];
      const isCorrect = q.options.some((opt) => opt.isCorrect && opt.optionText === selectedOption);
      if (isCorrect) {
        score += q.points || 1; // Default to 1 point if not specified
      }
      responseAnswers.push({
        questionId: q._id,
        question: q.question, // Add question text
        selectedOption,
        isCorrect,
      });
    });

    // Record the quiz attempt
    const quizResponse = new QuizResponse({
      quiz: quiz._id,
      user: req.user._id,
      answers: responseAnswers,
      score,
    });

    await quizResponse.save();

    res.json({ score, message: "Quiz attempt recorded successfully!" });
  } catch (error) {
    console.error("Error handling quiz attempt:", error);
    res.status(500).json({ error: error.message });
  }
});


// Get a User's Created Quizzes
router.get("/quizzes/created", validateUser, async (req, res) => {
  try {
    const quizzes = await Quiz.find({ creator: req.user._id });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a User's Attempted Quizzes
router.get("/quizzes/attempted", validateUser, async (req, res) => {
  try {
    const userId = req.user._id; // Assuming the auth middleware sets req.user
    const attempts = await QuizResponse.find({ user: userId }).populate({
      path: 'quiz',
      populate: {
        path: 'creator',
        select: 'name email'
      }
    });

    res.json(attempts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Fetch a specific quiz by ID
router.get("/quizzes/:id", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a question to a quiz
router.post("/quizzes/:id/questions", async (req, res) => {
  try {
    const { question, type, options, points, explanation } = req.body;
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    const newQuestion = {
      question,
      type,
      options,
      points: points || 1,
      explanation: explanation || "",
    };

    quiz.questions.push(newQuestion);
    await quiz.save();

    res.status(201).json(quiz.questions[quiz.questions.length - 1]); // Return the newly added question
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit a specific question in a quiz
router.put("/quizzes/:id/questions/:questionId", async (req, res) => {
  try {
    const { question, type, options, points, explanation } = req.body;
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    const questionIndex = quiz.questions.findIndex(
      (q) => q._id.toString() === req.params.questionId
    );

    if (questionIndex === -1) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Update the question fields
    const updatedQuestion = {
      question,
      type,
      options,
      points: points || 1,
      explanation: explanation || "",
    };

    quiz.questions[questionIndex] = { ...quiz.questions[questionIndex], ...updatedQuestion };
    await quiz.save();

    res.json(quiz.questions[questionIndex]); // Return the updated question
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a specific question from a quiz
router.delete("/quizzes/:id/questions/:questionId", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    const questionIndex = quiz.questions.findIndex(
      (q) => q._id.toString() === req.params.questionId
    );

    if (questionIndex === -1) {
      return res.status(404).json({ error: "Question not found" });
    }

    quiz.questions.splice(questionIndex, 1); // Remove the question
    await quiz.save();

    res.json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/quizzes/:id/responses', validateUser, async (req, res) => {
  try {
    // console.log("Fetching responses for quizId:", req.params.id); // Add this line for debugging
    const responses = await QuizResponse.find({ quiz: req.params.id }).populate('user');
    res.json(responses);
  } catch (error) {
    console.error('Error fetching responses:', error);
    res.status(500).json({ message: 'Error fetching responses' });
  }
});

router.get('/quizzes/:quizId/responses/:responseId', validateUser, async (req, res) => {
  try {
    // console.log("Fetching response for quizId:", req.params.quizId, "responseId:", req.params.responseId); // Add this line for debugging
    const response = await QuizResponse.findById(req.params.responseId).populate('user');
    if (!response) {
      return res.status(404).json({ message: 'Response not found' });
    }
    res.json(response);
  } catch (error) {
    console.error('Error fetching response:', error);
    res.status(500).json({ message: 'Error fetching response' });
  }
});

module.exports = router;
