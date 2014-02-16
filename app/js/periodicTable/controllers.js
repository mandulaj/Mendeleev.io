angular.module("periodicTable")

.controller("periodicTableController",
function($scope, Periods) {
  Periods.getPeriods(function(periods) {
    $scope.periods = periods;
  });
})

.controller("elementController",
function($scope, $modal) {
  $scope.showDetailView = function() {
    var modal = $modal.open({
      templateUrl: "/views/element-detail.html",
      controller: "elementDetailController",
      // Pass the element property on to the modal view: ...
      resolve: {
        element: function() {
          return $scope.element;
        }
      }
    });
  }
})

.controller("elementDetailController",
function($scope, element) {
  $scope.element = element;
  console.log($scope.element);
});