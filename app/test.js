var elem = require("./elements.json")


var chem = require("./chemistrymath.js")

var ChemistryMath = new chem.ChemistryMath(elem)





var mol = ChemistryMath.parseAtom("H2")

console.log(JSON.stringify(mol))