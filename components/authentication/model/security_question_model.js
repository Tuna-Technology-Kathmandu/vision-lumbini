const mongoose = require("mongoose");

const SecurityQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true, unique: true },
  answerHash: { type: String, required: true }, 
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const SecurityQuestion = mongoose.model("SecurityQuestion", SecurityQuestionSchema);
module.exports = SecurityQuestion;