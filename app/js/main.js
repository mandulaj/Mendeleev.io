$(document).ready(function() {

window.onhashchange = function() {
  Mendeleev.showPage(window.location.hash);
}

// "Redirect" to the default "page" - the periodic table.
if (!window.location.hash) {
  window.location.hash = "periodic-table";
}
else {
  // Trigger hashchange event.
  Mendeleev.showPage(window.location.hash);
}

});
