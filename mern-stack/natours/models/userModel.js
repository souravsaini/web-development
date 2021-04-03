const mongoose = require ('mongoose');
const validator = require ('validator');

const userSchema = new mongoose.Schema ({
  name: {type: String, required: [true, 'name is required']},
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'valid email is required'],
  },
  photo: {type: String},
  password: {
    type: String,
    required: [true, 'password is required'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'confirm password is required'],
  },
});

const User = mongoose.model ('User', userSchema);
module.exports = User;
