var express = require("express");
var app = express();
var port = 5000;

// Register express server routes.
require("./server/router")(app);

app.listen(port, function () {
  console.log("Application is running on port - ", port);
});

process.on("uncaughtException", (err) => {
  // This should not happen
  console.error("Pheew ...! Something unexpected happened. This should be handled more gracefully. I am sorry. The culprit is: ", err);
});