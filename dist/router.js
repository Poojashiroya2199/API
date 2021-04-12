"use strict";

var _require = require("express"),
    Router = _require.Router;

var router = Router();

var middleware = require("./middleware");

module.exports = function () {
  router.use(middleware());
  router.use("/", function (req, res) {
    res.send("router");
  });
  return router;
};
//# sourceMappingURL=router.js.map