const mongoose = require("mongoose");
const crypto = require("crypto");
var uuid = require("uuid");

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 32,
    trim: true
  },
  lastname: {
    type: String,
    maxlength: 32,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  userinfo: {
    type: String,
    trim: true
  },
  encry_password: {
    type: String,
    required: true
  },
  salt: String,
  role: {
    type: Number,
    default: 0
  },
  purchases: {
    type: Array,
    default: []
  }
}, {timestamps: true});

userSchema.virtual("password")
  .set(function(password) {
    this._password = password;
    this.salt = uuid.v1();
    this.encry_password = this.securePassword(password);
  })
  .get(function() {
    return this._password;
  })

userSchema.methods = {

  authenticate: function(plainTextPassword) {
    return this.securePassword(plainTextPassword) === this.encry_password;
  },

  securePassword: function(plainTextPassword) {
    if (!plainTextPassword) return "";
    try {
      return crypto.createHmac('sha256', this.salt)
                   .update(plainTextPassword)
                   .digest('hex');
    } catch (e) {
      return "";
    } finally {

    }
  }
}

module.exports = mongoose.model("User", userSchema)
