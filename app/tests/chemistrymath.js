var ChemistryMath = require("../chemistrymath.js");
var elements = require("../elements.json");

var chemistry = new ChemistryMath.ChemistryMath(elements);

describe("new ChemistryMath", function() {
  it("should initialize a chemistrymath object", function(done) {
    if (chemistry.elements) {
      done();
    }
  });
});

describe("ChemistryMath#parseEquation", function() {
  it("should parse a chemical equation", function(done) {
    var equation = chemistry.parseEquation("CH4+O2=CO2+H2O");
    if (equation) {
      console.dir(equation);
      done();
    }
  });
});

describe("ChemistryMath#parseMolecule", function() {
  it("should parse a molecule", function(done) {
    var molecule = chemistry.parseMolecule("CH4");
    if (molecule) {
      console.dir(molecule);
      done();
    }
  });
});
