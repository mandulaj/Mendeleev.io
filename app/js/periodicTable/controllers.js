angular.module("periodicTable")

.controller("periodicTableControl",
function($scope, Periods) {
  Periods.get(function(periods) {
    $scope.periods = periods; 
  });
});
