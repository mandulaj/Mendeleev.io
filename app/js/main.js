$(document).ready(function() {

Mendeleev.showPage = function(hash) {
  if (hash === "#periodic-table")
    Mendeleev.showTable();
  else if (hash === "#element-list")
    Mendeleev.showList();
  else if (hash === "#about")
    Mendeleev.showAbout();
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
