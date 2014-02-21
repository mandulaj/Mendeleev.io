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

function parseEquation(eq)
{
    var count = eq.match(/=/g);
    if (count != null && count.length === 1)
    {
        var equations = eq.split("=");
        return new Equation( parseExpression(equations[0]), parseExpression(equations[1]) );
    }
    else
    {
        return null; //parseExpression( eq );
    }
}

function parseExpression( exp )
{
    var count = exp.match(/\+/g);
    var returnMolecules = []
    
    if ( count.length >= 1 )
    {
        var molecules = exp.split("+");
        
        for ( var i = 0; i < molecules.length; i++ )
        {
            returnMolecules[i] = parseMolecule( molecules[i] );
        }
        return new Expression( returnMolecules )
    }
    else
    {
        return new Expression( [parseMolecule( exp )])
    }
    
}

function parseMolecule( mol )
{
    var moles = mol.match( /^[0-9]*/ )[0]
    if ( moles ==  0 )
    {
        moles = 1;
    }
    
    var atoms = mol.match( /[A-Z][a-z]{0,2}[0-9]*/g )
    var returnAtoms = []
    if ( atoms != null )
    {
        for ( var i = 0; i < atoms.length; i++ )
        {
            returnAtoms[i] = parseAtom(atoms[i]);
        }
        
        return new Molecule(moles,returnAtoms);
    }
    else
    {
        // TODO: when atoms === null
    }
}

function parseAtom( at )
{
    var number = at.match(/[0-9]+/g)
    var element = at.match(/[A-Z][a-z]{0,2}/g)[0]
    if ( number === null )
    {
        number = 1;
    }
    else
    {
        number = number[0]
    }
    
    if ( typeof getElementObject(element) != 'undefined' )
    {
        return new Atom(element, number)
    }
    else
    {
        // TODO: if element doesn't exist.
        console.log(number)
        console.log(element)
    }
    
}

// Atom ***************************************************************************
function Atom(element,number)
{
    this.element = element;
    this.n = number;
    //this.property = getElementObject(element)
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
// Returns mass of molecule
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
// Returns percentage composition of `element` in molecule 
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
function Equation (left_expression, right_expression)
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
//console.log(test.expression[0].percentageComposition("H"))
console.log(JSON.stringify(parseExpression("CH4+2O2+He2+Fe3")))



