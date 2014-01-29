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

Mendeleev.table = {};


// Correctly attaches a chemical element to the container and initialized all classes.
Mendeleev.table.attachElement = function(element, container) {

}

Mendeleev.table.show = function() {
  var root = $(".mendeleev");
  // Delete content of other pages.
  root.html("");
  
  var periodicTableContainer = $("<div>")
      .addClass("periodic-table");

  Mendeleev.getElements(function(elements) {

    // Period 1


    elements.forEach(function(element) {
      var elementDiv =  $("<div>")
          .addClass("element")
          .addClass(element.group);

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
      periodicTableContainer.append(elementDiv)
    });

    root.append(periodicTableContainer);
  });
}

Mendeleev.list = {};
Mendeleev.list.show = function() {
  var root = $(".mendeleev");
  root.html("");
}

Mendeleev.about = {};
Mendeleev.about.show = function() {

}

Mendeleev.showPage = function(hash) {
  if (hash === "#periodic-table")
    Mendeleev.table.show();
  else if (hash === "#element-list")
    Mendeleev.list.show();
  else if (hash === "#about")
    Mendeleev.about.show();
}
