//Mendeleev.getElements(function(e){
//	var elements = e;
//});
var elements = require("./elements.json")

function getelementObject(element)
{
    for ( var i = 0; i < elements.length; i++ )
    {
        if ( elements[i].symbol == element )
        {
            return elements[i];
        }
    }
}



// Atom ***************************************************************************
function Atom(element,number)
{
    this.element = element;
    this.n = number;
    this.property = getelementObject(element)
}

Atom.prototype.getNumOfAtoms = function()
{
    return this.n;
}

Atom.prototype.getAtomName = function()
{
    return this.element;
}

// Molecule ***************************************************************************
function Molecule(moles,molecule)
{
	this.n_moles = moles;
	this.molecule = molecule;
}

Molecule.prototype.numOfElement = function(element)
{
	var i,
        numOfElem = 0;
    for ( i = 0; i < this.molecule.length; i++ )
    {
        if ( this.molecule[i] instanceof Atom )
        {
            if ( this.molecule[i].getAtomName() === element )
            {
                numOfElem += this.molecule[i].getNumOfAtoms();
            }
        }
        else if ( this.molecule[i] instanceof Molecule )
        {
            // If part of molecule is a sub-molecule
            numOfElem += this.molecule[i].numOfElement(element)
        }
    }
    numOfElem *= this.n_moles;
    return numOfElem;
}



// Expression ***************************************************************************
function Expression(expression) 
{
	this.expression = expression;
}

Expression.prototype.numOfElement = function(element)
{
    var i,
        numOfEle = 0;
    
    for ( i = 0; i < this.expression.length; i++ )
    {
        numOfEle += this.expression[i].numOfElement(element)
    }
    return numOfEle;
}



// Equation ***************************************************************************
function Equation ()
{
	this.leftHandSide = new Expression(left_expression);
	this.rightHandSide = new Expression(right_expression);

}

var test = new Expression([
    new Molecule(1,[
        new Atom("C",1),
        new Atom("H",4)
    ]),
    new Molecule(2,[
        new Atom("O",2)
    ])
])
console.log(test.numOfElement("C"))
console.log(test.numOfElement("H"))
console.log(test.numOfElement("O"))


