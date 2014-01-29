$(document).ready(function() {

Mendeleev.showPage = function(hash) {
  if (hash === "#periodic-table")
    Mendeleev.table.show();
  else if (hash === "#element-list")
    Mendeleev.list.show();
  else if (hash === "#about")
    Mendeleev.about.show();
}

// "Redirect" to the default "page" - the periodic table.
if (window.location.hash === "") {
  window.location.hash = "periodic-table";
}

// Every time the page is reloaded, look for the page.
Mendeleev.showPage(window.location.hash);

// And on every "page change", modify the view.
window.onhashchange = function() {
  Mendeleev.showPage(window.location.hash);
}

});
