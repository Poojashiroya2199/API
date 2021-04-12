"use strict";

var mongoose = require("mongoose");

var constants = require("./../util/constants");

var userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  userName: {
    unique: true,
    type: String,
    required: true
  },
  phoneNumber: {
    unique: true,
    type: Number,
    required: true,
    validate: {
      validator: function validator(value) {
        return /\d{10}/.test(value);
      }
    },
    message: function message(props) {
      return "".concat(props.value, " is not a valid phone number");
    }
  },
  email: {
    unique: true,
    type: String,
    required: true
  },
  password: {
    type: String
  },
  userType: {
    type: Number,
    required: true,
    validate: {
      validator: function validator(values) {
        return Object.values(constants.userType).includes(values);
      }
    },
    message: function message(props) {
      return "".concat(props.value, "  invalid user type");
    }
  }
});
var User = mongoose.model('User', userSchema);
module.exports = User;
//# sourceMappingURL=userModel.js.map