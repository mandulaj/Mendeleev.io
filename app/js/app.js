var mendeleev = angular.module("mendeleev", [
  "ngRoute",
  "periodicTable"
]);

mendeleev.config(function($routeProvider) {
  $routeProvider
  .when("/periodic-table", {
    templateUrl: "/views/periodic-table.html",
    controller: "periodicTableControl"
  }).
  when("/element-list", {
    templateUrl: "/views/element-list.html",
    controller: "elementListControl"
  })
  .when("/calculator", {
    templateUrl: "/views/calculator.html",
    controller: "calculatorControl"
  })
  .when("/about", {
    templateUrl: "/views/about.html"
  })
  .otherwise({
    redirectTo: "periodic-table"
  });
});
