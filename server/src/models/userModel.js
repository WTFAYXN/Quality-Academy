const mongoose = require("mongoose");
const { Schema } = mongoose;

// User Schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0, // "0 = user" or "1 = admin"
    },
    quizzesCreated: [
      {
        type: Schema.Types.ObjectId,
        ref: "Quiz", // Reference to quizzes created by the user
      },
    ],
    quizzesAttempted: [
      {
        type: Schema.Types.ObjectId,
        ref: "QuizResponse", // Reference to quizzes attempted by the user
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
