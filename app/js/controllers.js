var mendeleevControllers = angular.module("mendeleevControllers", [
  "mendeleevServices"
]);

mendeleevControllers.controller("periodicTableCtrl",
function($scope, Periods) {
  Periods.get(function(periods) {
    $scope.periods = periods; 
  });
});
