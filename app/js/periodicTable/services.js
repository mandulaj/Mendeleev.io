angular.module("periodicTable")

.factory("Periods", function($http) {

  function splitPeriod(elements, split) {
    var left = elements.filter(function(element) {
      return element.atomic_number <= split;
    });
    
    var right = elements.filter(function(element) {
      return element.atomic_number > split;
    }).map(function(element) {
      var alignedElement = element;
      alignedElement.align = "align-right";
      return alignedElement;
    }).reverse();

    return left.concat(right);
  }

  function slicePeriod(elements, start, end, split) {
    var slicedElements = elements.filter(function(element) {
      return (element.atomic_number > start && element.atomic_number <= end);
    });
    if (split)
      return splitPeriod(slicedElements, split);
    else
      return slicedElements;
  }

  function splitElementsIntoPeriods(elements) {
    var periods =  [];

    periods[0] = slicePeriod(elements, 0, 2, 1);

    periods[1] = slicePeriod(elements, 2, 10, 4);

    periods[2] = slicePeriod(elements, 10, 18, 12);

    periods[3] = slicePeriod(elements, 18, 36);

    periods[4] = slicePeriod(elements, 36, 54);

    periods[5] = slicePeriod(elements, 54, 56)
                .concat(slicePeriod(elements, 71, 86, 56));

    periods[6] = slicePeriod(elements, 86, 88)
                .concat(slicePeriod(elements, 103, 118, 56));

    // Lanthanides
    periods[7] = slicePeriod(elements, 56, 71);
    periods[7].name = "lanthanides";

    // Actinides
    periods[8] = slicePeriod(elements, 88, 103);
    periods[8].name = "actinides";
    
    return periods;
  }

  return {
    getPeriods: function(cb) {
      $http.get("/elements.json").success(function(elements) {
        var periods = splitElementsIntoPeriods(elements);
        cb(periods);
      });
    }
  };
});

