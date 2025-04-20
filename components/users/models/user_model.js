const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'editor', 'subscriber'],
    default: 'subscriber',
  },
  lastLogin: {
    type: Date,
    default: null,
  },
  unique_id: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  is_security_qxn_added: {
    type: Boolean,
    default: false, 
  },
  securityQuestions: [{
    question: { type: String },
    answer: { type: String } 
  }],
  securityQuestionsUpdatedAt: {
    type: Date, 
    default: null
  },
  resetPasswordToken: {
    type: String,
    default: null
  },
  resetPasswordExpires: {
    type: Date,
    default: null
  }
}, { timestamps: true });

userSchema.pre('save', function(next) {
  if (this.is_security_qxn_added) {

    if (!this.securityQuestions || this.securityQuestions.length !== 3) {
      return next(new Error("You must provide exactly 3 security questions and answers."));
    }

    this.securityQuestions.forEach((item) => {
      item.answer = item.answer.trim(); 
    });

    this.securityQuestionsUpdatedAt = new Date();
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
