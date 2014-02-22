//Mendeleev.getElements(function(e){
//	var elements = e;
//});
var elements = require("./elements.json");

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


Object.prototype.cloneSelf = function() 
{
    var target = {};
    for ( var i in this ) 
    {
        if ( this.hasOwnProperty(i) ) 
        {
            target[i] = this[i];
        }
    }
    return target;
}

Math.GCD = function(array)
{
    var x, y;
    if (array[0] < 0)
    {
        x = -array[0];
    }
    else
    {
        x = array[0];
    }
    for ( var i = 1; i < array.length; i++ )
    {
        if ( array[i] < 0 )
        {
            y = -array[i];
        }
        else
        {
            y = array[i];
        }
        while ( x && y )
        { 
            if ( x > y )
            {
                x %= y;
            }
            else
            {
                y %= x; 
            }
        }
        x += y;
    }
    return x;
}

Math.LCM = function(array)  // A is an integer array (e.g. [-50,25,-45,-18,90,447])
{   
    var a = Math.abs(array[0]);
    for ( var i = 1; i < array.length; i++ )
    { 
        var b = Math.abs(array[i]), c = a;
        while (a && b)
        {
            if ( a > b )
            {
                a %= b;
            }
            else
            {
                b %= a;                
            }
        } 
        a = Math.abs(c*array[i])/(a+b);
    }
    return a;
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


// BUG: returns expression.expression: [molec1,molec2 ...] instead of expression:  [molec1,molec2 ...] 
function parseExpression( exp )
{
    var count = exp.match(/\+/g);
    var returnMolecules = [];
    
    if ( count != null && count.length >= 1 )
    {
        var molecules = exp.split("+");
        
        for ( var i = 0; i < molecules.length; i++ )
        {
            returnMolecules[i] = parseMolecule( molecules[i] );
        }
        return new Expression( returnMolecules );
    }
    else
    {
        return new Expression( [parseMolecule( exp )]);
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
    var moles = mol.match( /^[0-9]*/ )[0];
    if ( moles ==  0 )
    {
        moles = 1;
    }
    
    if (mol.match(/\(/g) != null && mol.match(/\)/g) != null)
    {
        if ( mol.match(/\(/g).length != mol.match(/\)/g).length )
        {
            return null
        }
    }
    
    var subMolecules = []
    
    while ( mol.indexOf("(") != -1 )
    {
        var pos =  mol.indexOf("("),
            startIndex = pos;
            counter = 0;
        do
        {
            if ( mol[pos] == "(" )
            {
                counter++;
            }
            else if ( mol[pos] == ")")
            {
                counter--;
            }
            pos++;
        }
        while (counter)
        
        var sufNumber = ""
        while ( /[0-9]/.test(mol[pos]) )
        {
            pos++;
            sufNumber += mol[pos-1]
        }
        var string = mol.substring(startIndex,pos);
        mol = mol.replace(string,"$");
        
        string = string.slice( 1,-1 - sufNumber.length );
        string = sufNumber + string;
        subMolecules.push( parseMolecule( string ) );
    }
    
    var atoms = mol.match( /[A-Z][a-z]{0,2}[0-9]*|\$/g );
    var returnAtoms = [];
    if ( atoms != null )
    {
        var indexOfSubMolecule = 0;
        for ( var i = 0; i < atoms.length; i++ )
        {
            if ( atoms[i] == "$" )
            {
                returnAtoms[i] = subMolecules[indexOfSubMolecule]
                indexOfSubMolecule++;
            }
            else
            {
                returnAtoms[i] = parseAtom(atoms[i]);
            }
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
    var number = at.match(/[0-9]+/g);
    var element = at.match(/[A-Z][a-z]{0,2}/g)[0];
    if ( number === null )
    {
        number = 1;
    }
    else
    {
        number = number[0];
    }
    
    if ( typeof getElementObject(element) != 'undefined' )
    {
        return new Atom(element, number);
    }
    else
    {
        // TODO: if element doesn't exist.
        console.log(number);
        console.log(element);
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
    this.property = getElementObject(element);
}

Atom.prototype.getNumOfAtoms = function()

{
    return parseInt(this.n);
}

Atom.prototype.getAtomName = function()
// TODO: This will be changed
{
    return this.element;
}


Atom.prototype.getMass = function()
{
    return parseFloat(this.property.atomic_weight * this.n);
}

Atom.prototype.getNumOfMoles = function(mass)
{
    return mass/this.property.atomic_weigth;
}

Atom.prototype.setNumOfAtoms = function(number)
{
    this.n = number;
}

Atom.prototype.printable = function()
{
    if ( this.n == 1 )
    {
        return this.element;
    }
    else
    {
        return this.element + this.n;
    }
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

Molecule.prototype.listElements = function()
{
    var listOfElem = [];
    for ( var i = 0; i < this.molecule.length; i++ )
    {
        var element = this.molecule[i].getAtomName();
        if ( listOfElem.indexOf(element) === -1 )
        {
            listOfElem.push(element);
        }
    }
    return listOfElem;
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
            mass += this.molecule[i].getMass();
            
        }
        else if ( this.molecule[i] instanceof Molecule )
        {
            // If part of molecule is a sub-molecule
            mass += this.molecule[i].formulaMass();
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


Molecule.prototype.toEmpirical = function()
{
    var listOfns = [];
    for ( var i = 0; i < this.molecule.length; i++ )
    {
        if ( this.molecule[i] instanceof Atom )
        {
            listOfns[i] = this.molecule[i].getNumOfAtoms();
        }
        if ( this.molecule[i] instanceof Molecule )
        {
            //Complicated ... 
            this.molecule[i].
            listOfns[i] = this.molecule[i].
        }
    }
    var gcd = Math.GCD(listOfns);
    for ( var i = 0; i < this.molecule.length; i++ )
    {
        this.molecule[i].setNumOfAtoms(listOfns[i]/gcd);
    }
}

Molecule.prototype.printable = function(molesInFront)
{
    if ( typeof molesInFront == "undefined" )
    {
        molesInFront = true;
    }
    var returnString = "";
    for ( i = 0; i < this.molecule.length; i++ )
    {
        if ( this.molecule[i] instanceof Atom )
        {
            returnString += this.molecule[i].printable();
            
        }
        else if ( this.molecule[i] instanceof Molecule )
        {
            var moles = this.molecule[i].n_moles;
            console.log(JSON.stringify(this.molecule[i],null,2))
            // If part of molecule is a sub-molecule
            returnString += "(" + this.molecule[i].printable(false) + ")" + moles;
        }
    }
    if ( this.n_moles == 1 )
    {
        return returnString;
    }
    else
    {
        if (molesInFront)
        {
            return this.n_moles + returnString;
        }
        else
        {
            return returnString
        }
    }
}

Molecule.prototype.simplify = function()
{
    for ( var i = 0; i < this.molecule.length; i++ )
    {
        if ( this.molecule[i] instanceof Atom )
        {
            // Complicated ...
        }
        else if ( this.molecuel[i] instanceof Molecule )
        {
            this.molecule[i].simplify();
        }
    }
}

Molecule.prototype.expand = function()
{
    if (this.n_moles != 1)
    {
        for ( var i = 0; i < this.molecule.length; i++ )
        {
            if ( this.molecule[i] instanceof Atom )
            {
                this.molecule[i].setNumOfAtoms( this.n_moles * this.molecule[i].getNumOfAtoms() );
            }
        }
        this.n_moles = 1;
    }
}

Molecule.prototype.getAtoms = function()
{
    var returnList = [];
    for ( var i = 0; i < this.molecule.length; i++ )
    {
        returnList[i] = this.molecule[i].cloneSelf();
    }
    return returnList;
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
        numOfEle += this.expression[i].numOfElement(element);
    }
    return numOfEle;
}

Expression.prototype.printable = function()
{
    var returnString = "",
        moleculeList = [];
    for ( var i = 0; i < this.expression.length; i++ )
    {
        moleculeList[i] = this.expression[i].printable();
    }
    returnString = moleculeList.join(" + ");
    return returnString;
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
	this.leftHandSide = left_expression;
	this.rightHandSide = right_expression;

}

Equation.prototype.balance = function()
{
 // TODO: implement balance    
}

Equation.prototype.printable = function()
{
    return this.leftHandSide.printable() + " = " + this.rightHandSide.printable();
}


// Tests and Examples *************************************************

/*
var methane = parseMolecule("CH4");
console.log("Percentage Composition of H in methane: "+methane.percentageComposition("H")+"%");
console.log("Mass of methane: "+methane.formulaMass());
console.log("Mass of 5 methane: "+methane.formulaMass(5));


test = parseMolecule("C2C2H8Cl16H4I4Kr20Uuo6Fe4");
console.log(test.printable());
console.log("Weight: " + test.formulaMass());
test.toEmpirical();
console.log(test.listElements());
console.log(test.printable());

test4 = test.getAtoms()
console.log(test4)

test2 = parseEquation("CH4+O2=CO2+H2O");
//console.log(JSON.stringify(test2,null,2));
//console.log(test2.printable());

test3 = { eq: parseExpression("C+C+C+H") };
//console.log(JSON.stringify(test3,null,2));
*/

test = parseMolecule("C2(SO4(C2H4)2)2")
console.log(test.formulaMass())
console.log(test.printable())
test.toEmpirical()
console.log(test.printable())

//console.log(JSON.stringify(test,null,2))