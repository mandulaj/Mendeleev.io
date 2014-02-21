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

/* Function for parsing Equations
 * 
 * Returns a Equation object. 
 * If `eq` is not a equation ie. has no "=" returns null.
 * Equation must be of form Expression=Expression
 * -- viz. parseExpression() for more --
*/
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
        return null;
    }
}

/* Function for parsing Expressions
 * 
 * Returns a Expression object.
 * Expressions are of form Molecule+Molecule+...
 * Can have any number of molecules greater or equal to 1
 * Converts Atoms to Molecules --> Atom+Molecule+Atom ==> Molecule+Molecule+Molecule
 * viz. parsing Molecule for details on Molecule form
*/ 
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

/* Function for parsing Molecules
 * 
 * Returns a Molecule object.
 * Molecule must be in the form of MXnYnZn where:
 *  M is the number of moles of the molecule
 *  X,Y,Z are valid element symbols eg. H, He Uuo ...
 *  n are number of the preceding element in the molecule (H2O = Water, 3CH4 = 3 Moles of Methane)
*/ 
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

/* Function for parsing Atoms
 * 
 * Returns a Atom object
 * Atoms must be in the form Xn where
 *  X is a valid element
 *  n is a the number of element X
 * if no n is specified n = 1
*/ 
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
/*
 * used for storing and manipulating individual atoms
 * 
 * Properties:
 *  Atom.element    - Symbol of elements used to identify atom
 *  Atom.n          - Number of the element
 *  Atom.property   - object from element.json with a list of properties
 * 
 * Methods:
 *  Atom.getNumOfAtoms()        - returns the number of atoms per mole
 *  Atom.getAtomName()          - returns element symbol
 *  Atom.getMass()              - returns mass of n moles of element
 *  Atom.getNumOfMoles(mass)    - returns number of moles that weigh mass grams
*/ 
function Atom(element,number)
{
    this.element = element;
    this.n = number;
    this.property = getElementObject(element)
}

Atom.prototype.getNumOfAtoms = function()

{
    return this.n;
}

Atom.prototype.getAtomName = function()
// TODO: This will be changed
{
    return this.element;
}


Atom.prototype.getMass = function()
{
    return parseInt(this.property.atomic_weight * this.n);
}

Atom.prototype.getNumOfMoles = function(mass)
{
    return mass/this.property.atomic_weigth;
}

// Molecule ***************************************************************************
/*
 * used for storing and manipulating molecules
 * 
 * Properties:
 *  Molecule.n_moles    - number of moles of the molecule
 *  Molecule.molecule   - a array of Atom objects that make up the molecule
 * 
 * Methods:
 *  Molecule.numOfElement(element)          - number of atoms of element in molecule
 *  Molecule.formulaMass([moles])           - mass of [moles]/n_moles moles of molecule
 *  Molecule.percentageComposition(element) - percentage composition of `element` in molecule
*/
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
                numOfElem += parseInt(this.molecule[i].getNumOfAtoms());
            }
        }
        else if ( this.molecule[i] instanceof Molecule )
        {
            // If part of molecule is a sub-molecule
            numOfElem += parseInt(this.molecule[i].numOfElement(element));
        }
    }
    numOfElem *= this.n_moles;
    return numOfElem;
}

Molecule.prototype.formulaMass = function(moles)
{
    if ( typeof moles === 'undefined' )
    {
        var moles = this.n_moles;
    }
    var i,
    mass = 0;
    for ( i = 0; i < this.molecule.length; i++ )
    {
        if ( this.molecule[i] instanceof Atom )
        {
            mass += parseInt(this.molecule[i].getMass());
            
        }
        else if ( this.molecule[i] instanceof Molecule )
        {
            // If part of molecule is a sub-molecule
            mass += parseInt(this.molecule[i].formulaMass());
        }
    }
    return mass * moles;
}

Molecule.prototype.percentageComposition = function(element)
{
    var totalMass = this.formulaMass();
    var numOfElem = this.numOfElement(element);
    
    var tempElement = new Atom(element,numOfElem);
    var massElement = tempElement.getMass();
    
    return massElement/totalMass;
}


// Expression ***************************************************************************
/*
 * used for storing and manipulating expressions
 * 
 * Properties:
 *  Expression.expression   - array of Molecules that make up the expression
 * 
 * Methods:
 *  Expression.numOfElement(element) - returns the total number of element in expression
*/
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
/*
 * used for storing and manipulating Equations
 * 
 * Properties:
 *  Equation.leftHandSide   - a Expression object containing the left-hand side of the equation 
 *  Equation.rightHandSide  - a Expression object containing the right-hand side of the equation
 * 
 * Methods:
 *  Equation.balance()  - automatically balances the right-hand and left-hand side
 * 
*/
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
//console.log(JSON.stringify(parseEquation("CH4+O2=CO2+H2O"),null,1))
console.log(parseMolecule("NH4NO3").percentageComposition("N")*100)


