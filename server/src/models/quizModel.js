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
      isPublic: { type: Boolean, default: true },
      timeLimit: { type: Number },
      shuffleQuestions: { type: Boolean, default: false },
      allowMultipleAttempts: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

// Virtual field to calculate total points
quizSchema.virtual('totalPoints').get(function() {
  return this.questions.reduce((acc, question) => acc + (question.points || 1), 0);
});

const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;