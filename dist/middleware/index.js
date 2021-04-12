"use strict";

var _require = require("express"),
    Router = _require.Router;

var userMiddleware = require("./userMiddleware");

module.exports = function () {
  var middleware = Router();
  middleware.use(userMiddleware());
  return middleware;
};
//# sourceMappingURL=index.js.map