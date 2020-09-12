const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

var Schema = mongoose.Schema;
var userSchema = new Schema({
  name: {
    type: String,
    maxlength: 15,
  },
  lastname: {
    type: String,
    maxlength: 30,
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    minlength: 5
  },
  role: {
    type: Number,
    default: 0
  },
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
});

userSchema.pre("save", function(next)  {
  var user = this;

  if(user.isModified("password")) {
    console.log("password changed")
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if(err)
        return next(err);
      bcrypt.hash(user.password, salt, (err, hash) => {
          if(err)
            return next(err);
          else {
            user.password = hash;
            return next();
          }

      });
    });
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = function(plainPassword, callback) {
  bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
    if(err)
      return callback(err);
    return callback(null, isMatch);
  });
}

userSchema.methods.generateToken = function(callback) {
  var user = this;
  let token = jwt.sign(user._id.toHexString(), 'secret');
  user.token = token;
  user.save( (err, user) => {
    if(err)
      return callback(err);
    callback(null, user);
  })
}

userSchema.statics.findByToken = function(token, callback) {
  var user = this;

  jwt.verify(token, "secret", (err, decode) => {
    user.findOne({"_id": decode, "token": token}, (err, user) => {
      if(err)
        callback(err);
      callback(null, user);
    })
  })
}

var User = mongoose.model('User', userSchema);


module.exports = { User };
