/**
OLD and not used anymore.
Will be deleted
*/

$(document).ready(function() {

/**
* Whenever the URL hash changes, which means that the
* active "page" changes, changes, Mendeleev.showPage()
* gets called to render the correct page.
* It takes the responsibility of clearing the parent element.
*/

window.onhashchange = function() {
  Mendeleev.showPage(window.location.hash);
}

/**
* If the URL hash is not set, for example in a browser
* that just visited the page, it will get set to the
* default page, which is the periodic table.
* This triggers a hashchange event and the page is
* updated.
*/
if (!window.location.hash) {
  window.location.hash = "periodic-table";
}
else {
/**
* Otherwise, if the user made a full request to the
* server with the intention of visiting a specific pagem
* the page specified in the hash is immediately served,
* as it is not possible to fire a hashchange event.
*/
  Mendeleev.showPage(window.location.hash);
}

});
