const mongoose = require("mongoose");
const { Schema } = mongoose;

// Question Schema
const questionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    default: "single", // Question type: single/multiple choice
  },
  options: [
    {
      optionText: { type: String, required: true },
      isCorrect: { type: Boolean, default: false }, // Indicates the correct option(s)
    },
  ],
  points: {
    type: Number,
    required: false,
    default: 1, // Points awarded for the question
  },
  explanation: {
    type: String,
    required: false, // Optional explanation for the correct answer
  },
});

module.exports = questionSchema;
