"use strict";

var mongoose = require("mongoose");

var config = require("./config");

var DatabaseConnectionError = require("./util/errors");

var initialiseDB = function initialiseDB() {
  mongoose.connect("mongodb+srv://newuser:pooja123@cluster0.x7i06.mongodb.net/HRMS?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(function (data) {
    console.log("connection establish to database:" + config.db_name); //callback();
  })["catch"](function (err) {
    console.log("connection not establish to data base:" + config.db_name); //next(new DatabaseConnectionError("Server Error"));
  });
};

initialiseDB();
module.exports = initialiseDB;
//# sourceMappingURL=db.js.map