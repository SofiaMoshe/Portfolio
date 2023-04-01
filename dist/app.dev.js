"use strict";

var express = require("express");

var path = require("path");

var bodyParser = require("body-parser");

var _require = require("./data.json"),
    projects = _require.projects;

var app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use("/static", express["static"]("public"));
app.set("view engine", "pug");
app.get("/", function (req, res) {
  res.render("index", {
    projects: projects
  });
});
app.get("/about", function (req, res) {
  res.render("about");
});
app.get("/project/:id", function (req, res, next) {
  var id = req.params.id;

  if (projects[id]) {
    res.render("project", {
      project: projects[id]
    });
  } else {
    next();
  }
});
app.use(function (req, res, next) {
  var err = new Error("This page does not exist");
  err.status = 404;
  next(err);
});
app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  if (err.status === 404) {
    res.render("page-not-found", {
      err: err
    });
    console.log("Error ".concat(err.status, ": ").concat(err.message));
  } else {
    res.render("error", {
      err: err
    });
    console.log("Error ".concat(err.status, ": ").concat(err.message));
  }
});
app.listen(3000, function () {
  console.log("App is running on local:3000");
});