var Mendeleev = {};

Mendeleev.getElements = function(cb) {
  var request = new XMLHttpRequest();
    request.open("GET", "/elements.json");
    request.send();
    request.onreadystatechange = function() {
      if ((request.readyState === 4) && (request.status === 200)) {
        cb(JSON.parse(request.response));
      }
    }
} 

Mendeleev.showTable = function() {
  var root = $(".mendeleev");
  root.html("");
  Mendeleev.getElements(function(elements) {
    elements.forEach(function(element) {
      var elementDiv = $("<div>");
      elementDiv.addClass("table-element");
      elementDiv.append(
        $("<span>")
        .addClass("element-symbol")
        .text(element.symbol)
      );
      elementDiv.append(
        $("<span>")
        .addClass("element-name")
        .text(element.name)
      );
      root.append(elementDiv)
    });
  });
}

Mendeleev.showList = function() {
  var root = $(".mendeleev");
  root.html("");
}
