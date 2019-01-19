// Import dependencies.
var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var path = require("path");
var highlight = require("./highlight");

module.exports = function (app) {
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({extended: false}));
  // parse application/json
  app.use(bodyParser.json());
  app.use(morgan("dev"));
  // Load the UI files.
  app.use(express.static(path.resolve(__dirname + "/../" + "/client")));

  // Register /api/highlight endpoint for HTTP POST method.
  app.post("/api/highlight", (req, res) => {
    highlight.saveHighlightedText(req, res);
  });

  // Register /api/highlight endpoint for HTTP POST method.
  app.get("/api/highlight", (req, res) => {
    highlight.getAllHighlightedTexts(req, res);
  });
};