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
  var elementDiv =  $("<div>")
      .addClass("element")
      .addClass(element.align)
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
  container.append(elementDiv);

};

/**
* Adds the align-right value to the align property of the
* element object at a specific atomic number.
* These elements will be shifted to the side, to make the
* periodic table work.
*/

Mendeleev.table.setAlign = function(elements, split) {
  return elements.map(function(element) {
    if (element.atomic_number > split) {
      var alignedElement = element;
      alignedElement.align = "align-right";
      return alignedElement;
    }
    else {
       return element;
    }
  });
}

/**
* Simplifies the very repetitive task of splitting elements into
* periods, and calls Mendeleev.table.setAlign() for less redundancy.
*/

Mendeleev.table.sliceElements = function(elements, start, end, split) {
  var slicedElements = elements.filter(function(element) {
    return (element.atomic_number > start && element.atomic_number <= end);
  });
  if (split)
    return Mendeleev.table.setAlign(slicedElements, split);
  else
    return slicedElements;
};

/**
* Assigns elements to the correct periods, with the right layout
* properties set.
*/

Mendeleev.table.getPeriods = function(cb) {
  var periods = [];
  Mendeleev.getElements(function(elements) {
    
    periods[0] = Mendeleev.table.sliceElements(elements, 0, 2, 1),

    periods[1] = Mendeleev.table.sliceElements(elements, 2, 10, 4);

    periods[2] = Mendeleev.table.sliceElements(elements, 10, 18, 12);

    periods[3] = Mendeleev.table.sliceElements(elements, 18, 36);

    periods[4] = Mendeleev.table.sliceElements(elements, 36, 54);

    periods[5] = Mendeleev.table.sliceElements(elements, 54, 56)
                .concat(Mendeleev.table.sliceElements(elements, 71, 86, 56));

    periods[6] = Mendeleev.table.sliceElements(elements, 86, 88)
                .concat(Mendeleev.table.sliceElements(elements, 103, 118, 56));

    // Lanthanides
    periods[7] = Mendeleev.table.sliceElements(elements, 57, 71);

    // Actinides
    periods[8] = Mendeleev.table.sliceElements(elements, 89, 103);
    
    cb(periods);
  });
}

Mendeleev.table.show = function() {
  var root = $(".mendeleev");
  // Delete content of other pages.
  root.html("");
  
  var periodicTableContainer = $("<div>")
      .addClass("periodic-table");
  root.append(periodicTableContainer);

  Mendeleev.table.getPeriods(function(periods) {
    periods.forEach(function(period) {
      var tableRow = $("<div>")
      .addClass("period");
      
      period.forEach(function(element) {
        Mendeleev.table.attachElement(element, tableRow);
      });
      periodicTableContainer.append(tableRow);
    });
  });
}

Mendeleev.list = {};
Mendeleev.list.show = function() {
  var root = $(".mendeleev");
  root.html("");
}

Mendeleev.calc = {};

Mendeleev.calc.show = function() {
  var root = $(".mendeleev");
  root.html("");
}

Mendeleev.about = {};
Mendeleev.about.show = function() {
  var root = $(".mendeleev");
  root.html("");
}

// The hash routes
Mendeleev.showPage = function(hash) {
  if (hash === "#periodic-table")
    Mendeleev.table.show();
  else if (hash === "#element-list")
    Mendeleev.list.show();
  else if (hash === "#calculator")
    Mendeleev.calc.show();
  else if (hash === "#about")
    Mendeleev.about.show();
}
