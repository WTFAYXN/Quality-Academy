const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizResponseSchema = new Schema(
  {
    quiz: {
      type: Schema.Types.ObjectId,
      ref: "Quiz", // Reference to the quiz
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the user who took the quiz
      required: true,
    },
    answers: [
      {
        questionId: { type: String, required: true }, // ID of the question
        question: { type: String, required: true }, // Question text
        selectedOption: { type: Array, required: true }, // User's selected answers
        options: [
          {
            optionText: { type: String, required: true }, // Option text
            isCorrect: { type: Boolean, required: true }, // Whether the option is correct
          },
        ], // Options for the question
        isCorrect: { type: Boolean }, // Calculated correctness
      },
    ],
    score: {
      type: Number,
      required: true,
      default: 0,
    },
    completedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const QuizResponse = mongoose.model("QuizResponse", quizResponseSchema);
module.exports = QuizResponse;