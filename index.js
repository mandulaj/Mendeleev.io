var config = require("./config.json"),
    express = require("express");

var app = express();

// Serve everything in app/
app.use(express.static(__dirname + "/app"));

app.listen(config.port);
