var mendeleevControllers = angular.module("mendeleevControllers", []);

mendeleevControllers.controller("periodicTableCtrl",
function($scope, $http) {
    $http.get("/elements.json").success(function(elements) {
      $scope.elements = elements;
    });
});
