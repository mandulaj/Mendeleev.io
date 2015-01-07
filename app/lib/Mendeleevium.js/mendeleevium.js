/*
___  ___               _      _                 _                   _     
|  \/  |              | |    | |               (_)                 (_)    
| .  . | ___ _ __   __| | ___| | ___  _____   ___ _   _ _ __ ___    _ ___ 
| |\/| |/ _ \ '_ \ / _` |/ _ \ |/ _ \/ _ \ \ / / | | | | '_ ` _ \  | / __|
| |  | |  __/ | | | (_| |  __/ |  __/  __/\ V /| | |_| | | | | | |_| \__ \
\_|  |_/\___|_| |_|\__,_|\___|_|\___|\___| \_/ |_|\__,_|_| |_| |_(_) |___/
                                                                  _/ |    
                                                                 |__/     */
var avogadros = 6.0221413e23;

if ( module.exports ) { // We are in node
    var Atom            = require("./atom.js");
    var Molecule        = require("./molecule.js");
    var Expression      = require("./expression.js");
    var Equation        = require("./equation.js")
}
else
{
    if ( 
        typeof Atom         === "undefined" ||
        typeof Molecule     === "undefined" ||
        typeof Expression   === "undefined" ||     
        typeof Equation     === "undefined"
    )
    {
        throw "Modules not defined";
    }
}


var MENDELEEVIUM_MODULE_OBJECT;

// TODO: write a better function for getting the element property




/* Elements object used to store the elements.json
 *
 * this is one attempt to fix the module getElementObject() problem
 * this.elements - array of JSON objects describing each element's property
 */
function Elements( elements )
{
    this.elements = elements;
}

/* Function used to get the data about `element` from the elements.json file 
 * 
 * returns and object with all data about `element` - string symbol for element ("H", "C", "Fe", etc.)
 * used for getting the info but also validating if element exists 
 TODO: extract this to a separate method
 * Function currently causing us a lot of trouble
*/
Elements.prototype.getElementObject( element ) 
{
    for ( var i = 0; i < test.elements.length; i++ )
    {
        if ( this.elements[i].symbol == element )
        {
            return this.elements[i];
        }
    }
    return null;
};


/* Object exported to the module
 * 
 * used for bundle parse methods
 * forget the this.elements, it will go away with time
*/
function Mendeleevium( elements )
{
    if ( typeof elements === "undefined" )
    {
        this.elements = elements;
    }
    else
    {
        this.elements = [];
    }
    
    this.
}


/* Set-up Mendeleevium
 *
 * takes options object
 { 
    elements: [],  - array of element-data objects
 }
*/ 
Mendeleevium.prototype.setup = function( options )
{
    if ( typeof options.elements !== "undefined" )
    {
        this.elements = options.elements;
    }
}


/* Function for parsing Equations
 * 
 * Returns a Equation object. 
 * If `eq` is not a equation ie. has no "=", returns null.
 * Equation must be of form Expression=Expression
 * -- viz. parseExpression() for more --
*/
Mendeleevium.prototype.parseEquation = function( eq )  
{
    var count = eq.match( /=/g );
    if ( count !== null && count.length === 1 )
    {
        var equations = eq.split( "=" );
        return new Equation( this.parseExpression( equations[0] ), this.parseExpression( equations[1] ) );
    }
    else
    {
        return null;
    }
};

/* Function for parsing Expressions
 * 
 * Returns a Expression object.
 * Expressions are of form Molecule+Molecule+...
 * Can have any number of molecules greater or equal to 1
 * Converts Atoms to Molecules --> Atom+Molecule+Atom ==> Molecule+Molecule+Molecule
 * viz. parsing Molecule for details on Molecule form
*/ 
Mendeleevium.prototype.parseExpression = function( exp )
{
    var count = exp.match( /\+/g );
    var returnMolecules = [];
    
    if ( count !== null && count.length >= 1 )
    {
        var molecules = exp.split("+");
        
        for ( var i = 0; i < molecules.length; i++ )
        {
            returnMolecules[i] = this.parseMolecule( molecules[i] );
        }
        return new Expression( returnMolecules );
    }
    else
    {
        return new Expression( [this.parseMolecule( exp )] );
    }
    
};

/* Function for parsing Molecules
 * 
 * Returns a Molecule object.
 * Molecule must be in the form of MXnYnZn where:
 *  M is the number of moles of the molecule
 *  X,Y,Z are valid element symbols eg. H, He Uuo ...
 *  n is number of the preceding element in the molecule (H2O = Water, 3CH4 = 3 Moles of Methane)
 *  Can take sub-molecules eg. Fe2(SO4)3
*/ 
Mendeleevium.prototype.parseMolecule = function( mol )
{
    var moles = mol.match( /^[0-9]*/ )[0];
    if ( moles ===  0 )
    {
        moles = 1;
    }
    
    if ( mol.match( /\(/g ) !== null && mol.match( /\)/g ) !== null )
    {
        if ( mol.match( /\(/g ).length !== mol.match( /\)/g ).length )
        {
            return null;
        }
    }
    
    var subMolecules = [];
    
    while ( mol.indexOf( "(" ) !== -1 )
    {
        var pos =  mol.indexOf( "(" ),
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
        while (counter);
        
        var sufNumber = "";
        while ( /[0-9]/.test( mol[pos] ) )
        {
            pos++;
            sufNumber += mol[pos-1];
        }
        var string = mol.substring( startIndex, pos) ;
        mol = mol.replace( string, "$" );
        
        string = string.slice( 1,-1 - sufNumber.length );
        string = sufNumber + string;
        subMolecules.push( this.parseMolecule( string ) );
    }
    
    var atoms = mol.match( /[A-Z][a-z]{0,2}[0-9]*|\$/g );
    var returnAtoms = [];
    if ( atoms !== null )
    {
        var indexOfSubMolecule = 0;
        for ( var i = 0; i < atoms.length; i++ )
        {
            if ( atoms[i] == "$" )
            {
                returnAtoms[i] = subMolecules[indexOfSubMolecule];
                indexOfSubMolecule++;
            }
            else
            {
                returnAtoms[i] = this.parseAtom(atoms[i]);
            }
        }
        
        return new Molecule( moles, returnAtoms );
    }
    else
    {
        // TODO: when atoms === null
    }
};

/* Function for parsing Atoms
 * 
 * Returns a Atom object
 * Atoms must be in the form Xn where
 *  X is a valid element
 *  n is a the number of element X
 * if no n is specified n = 1
*/ 
Mendeleevium.prototype.parseAtom = function( at )
{
    var number = at.match( /[0-9]+/g );
    var element = at.match( /[A-Z][a-z]{0,2}/g )[0];
    if ( number === null )
    {
        number = 1;
    }
    else
    {
        number = number[0];
    }
    
    if ( typeof getElementObject( element ) !== 'undefined' )
    {
        return new Atom( element, number );
    }
    else
    {
        // TODO: if element doesn't exist.
        console.log( number );
        console.log( element );
    }
    
};



// CommonJS module
if ( module.exports ) {
    MENDELEEVIUM_MODULE_OBJECT = new Mendeleevium();
    module.exports.Mendeleevium = MENDELEEVIUM_MODULE_OBJECT
}
