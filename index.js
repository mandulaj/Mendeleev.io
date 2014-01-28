var config = require("./config.json"),
    express = require("express");

var app = express();

// gzip
app.use(express.compress());
// Serve everything in app/
app.use(express.static(__dirname + "/app"));

app.listen(config.port);
console.log("Listening on port", config.port);
