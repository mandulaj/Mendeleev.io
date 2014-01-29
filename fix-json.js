var fs = require("fs");

fs.readFile("app/elements.json", function(err, file) {
  if (!err) {
  var obj = JSON.parse(file);
  console.log(JSON.stringify(obj, null, 2));
  }
  else {
    throw err;
  }
});
