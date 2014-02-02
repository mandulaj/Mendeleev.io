//Mendeleev.getElements(function(e){
//	var elements = e;
//});
var elements = require("./elements.json")


function Molecule(moles,equation)
{
	this.n_moles = moles;
	this.equation = equation;
}

Molecule.prototype.numOfElement = function(element)
{
	return this.equation.element
}

function Expression(expression) 
{
	this.expression = expression;
}


function Equation ()
{
	this.leftHandSide = new Expression(left_expression);
	this.rightHandSide = new Expression(right_expression);

}

var test = new Molecule(1,{"C":2,"H":6})
console.log(test.n_moles)
console.log(test.equation)
console.log(test.numOfElement(C))
