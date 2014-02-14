var mendeleev = angular.module("mendeleev", [
  "ngRoute",
  "periodicTable"
]);

mendeleev.config(function($routeProvider) {
  $routeProvider
  .when("/periodic-table", {
    templateUrl: "/views/periodic-table.html",
    controller: "periodicTableView"
  }).
  when("/element-list", {
    templateUrl: "/views/element-list.html",
    controller: "elementListCtrl"
  })
  .when("/calculator", {
    templateUrl: "/views/calculator.html",
    controller: "calculatorCtrl"
  })
  .when("/about", {
    templateUrl: "/views/about.html"
  })
  .otherwise({
    redirectTo: "periodic-table"
  });
});
