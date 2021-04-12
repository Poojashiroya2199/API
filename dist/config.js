"use strict";

var NODE_ENV = process.env.NODE_ENV;
var config = NODE_ENV === "isDev" ? {
  port: 5000,
  db_url: "mongodb+srv://newuser:pooja123@cluster0.x7i06.mongodb.net/user?retryWrites=true&w=majority",
  db_name: "HRMS",
  salt_rounds: 12,
  TOKEN_TIME: 60 * 60 * 24 * 30,
  SECRET: "W3 Ar3 M3Rn D3v3L0p3Rs"
} : {
  port: 8080,
  db_url: "",
  db_name: "",
  salt_rounds: 12,
  TOKEN_TIME: 60 * 60 * 24 * 30,
  SECRET: "W3 Ar3 M3Rn D3v3L0p3Rs"
};
module.exports = config;
//# sourceMappingURL=config.js.map