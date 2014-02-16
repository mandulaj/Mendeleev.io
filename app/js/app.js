var mendeleev = angular.module("mendeleev", [
  "ngRoute",
  "periodicTable"
]);

mendeleev.config(function($routeProvider) {
  $routeProvider
  .when("/periodic-table", {
    templateUrl: "/views/periodic-table.html",
    controller: "periodicTableController"
  }).
  when("/element-list", {
    templateUrl: "/views/element-list.html",
    controller: "elementListController"
  })
  .when("/calculator", {
    templateUrl: "/views/calculator.html",
    controller: "calculatorController"
  })
  .when("/about", {
    templateUrl: "/views/about.html"
  })
  .otherwise({
    redirectTo: "periodic-table"
  });
});
