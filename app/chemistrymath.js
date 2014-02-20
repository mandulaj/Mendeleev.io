//Mendeleev.getElements(function(e){
//	var elements = e;
//});
var elements = require("./elements.json")

const avogadros = 6.0221413e23;

// TODO: write a better function for getting the element property
function getElementObject(element) 
{
    for ( var i = 0; i < elements.length; i++ )
    {
        if ( elements[i].symbol == element )
        {
            return elements[i];
        }
    }
}

// TODO: write a parse function

function parseExpression(exp)
{
    return exp
}




// Atom ***************************************************************************
function Atom(element,number)
{
    this.element = element;
    this.n = number;
    this.property = getElementObject(element)
}

Atom.prototype.getNumOfAtoms = function()
// Get number of atoms
{
    return this.n;
}

Atom.prototype.getAtomName = function()
// Get atom name
// TODO: This will be changed
{
    return this.element;
}


Atom.prototype.getMass = function()
{
    return this.property.atomic_weight * this.n;
}

// Molecule ***************************************************************************
function Molecule(moles,molecule)
{
	this.n_moles = moles;
	this.molecule = molecule;
}

Molecule.prototype.numOfElement = function(element)
// Returns number of elements `element` in Molecule
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

Molecule.prototype.formulaMass = function()
{
    var i,
    mass = 0;
    for ( i = 0; i < this.molecule.length; i++ )
    {
        if ( this.molecule[i] instanceof Atom )
        {
            mass += this.molecule[i].getMass();
            
        }
        else if ( this.molecule[i] instanceof Molecule )
        {
            // If part of molecule is a sub-molecule
            mass += this.molecule[i].formulaMass();
        }
    }
    return mass * this.n_moles;
}

Molecule.prototype.percentageComposition = function(element)
{
    // TODO: Finish this function
    var totalMass = this.formulaMass()
    
    if (this.numOfElement())
    
    if ( element instanceof Atom )
    {
        var elementMass = element.getMass();
    }
    else if ( element instanceof Molecule )
    {
        var elementMass = element.formulaMass();
    }
    else
    {
        var tempAtom = new Atom(element,1)
        var elementMass = tempAtom.getMass()
    }
    
    return elementMass/totalMass;
}


// Expression ***************************************************************************
function Expression(expression) 
{
	this.expression = expression;
}

Expression.prototype.numOfElement = function(element)
// Returns number of elements `element` in Expression
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

Equation.prototype.balance = function()
{
 // TODO: implement balance    
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
console.log(test.expression[0].percentageComposition("H"))



