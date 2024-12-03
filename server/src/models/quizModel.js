const mongoose = require("mongoose");
const { Schema } = mongoose;
const questionSchema = require("./questionModel");

const quizSchema = new Schema(
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      creator: {
        type: Schema.Types.ObjectId,
        ref: "User", // Reference to the user who created the quiz
        required: true,
      },
      questions: [questionSchema], // Array of questions
      status: { type: String, default: "draft" }, // "draft" | "published"
      settings: {
        isPublic: { type: Boolean, default: false },
        timeLimit: { type: Number },
        shuffleQuestions: { type: Boolean, default: false },
        allowMultipleAttempts: { type: Boolean, default: true },
      },
    },
    { timestamps: true }
  );
  
  const Quiz = mongoose.model("Quiz", quizSchema);
  module.exports = Quiz;
  