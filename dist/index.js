"use strict";

var express = require("express");

var cors = require("cors");

var bodyParser = require("body-parser");

var config = require("./config");

var router = require("./router");

var app = express();

var initialiseDB = require("./db");

var NODE_ENV = require("./config");

app.use(bodyParser.json());
app.use(cors({
  exposedHeaders: ["Authorization"]
}));
app.use("/v1", router());
app.get("/", function (req, res) {
  res.send("hello");
});
app.listen(config.port, function () {
  console.log(config.port);
  console.log(NODE_ENV);
});
//# sourceMappingURL=index.js.map