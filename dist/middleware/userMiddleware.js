"use strict";

var _require = require("express"),
    Router = _require.Router;

var _require2 = require("express-validator"),
    body = _require2.body,
    validationResult = _require2.validationResult;

var _require3 = require("./../util/errors"),
    UserCreationError = _require3.UserCreationError,
    UserValidationError = _require3.UserValidationError;

var _require4 = require("./../model/userModel"),
    User = _require4["default"];

module.exports = function () {
  var userMiddleware = Router();
  userMiddleware.post("/", body("email").isEmail(), body("password").notEmpty().isLength({
    min: 6
  }).isAlphanumeric(), body("firstName").notEmpty().isLength({
    min: 3,
    max: 25
  }), body("userName").notEmpty().isLength({
    min: 3,
    max: 25
  }), function (req, res, next) {
    //validate post data
    var erros = validationResult(req);

    if (!erros.isEmpty()) {
      console.log("user data is invalid");
      throw new UserValidationError(erros.errors);
    }

    next();
  }); //get user data

  userMiddleware.post("/", function (req, res, next) {
    res.send("user created");
  });
  return userMiddleware;
};
//# sourceMappingURL=userMiddleware.js.map