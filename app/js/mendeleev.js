var Mendeleev = {};

Mendeleev.getElements = function(cb) {
  var request = new XMLHttpRequest();
    request.open("GET", "/elements.json");
    request.send();
    request.onreadystatechange = function() {
      if (request.readyState === 4 && request.status === 200)
        cb(request.response);
    }
} 

Mendeleev.showTable = function() {
  var root = $(".mendeleev");
  root.html("");
  Mendeleev.getElements(function(elements) {
    root.html("<h2> Hey, I can load JSON data!</h2><pre>" + elements + "</pre>");
  });
}

Mendeleev.showList = function() {
  var root = $(".mendeleev");
  root.html("");
}
