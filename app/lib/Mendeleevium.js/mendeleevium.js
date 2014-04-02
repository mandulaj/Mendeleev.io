/*
   _____ _                    _     _             ___  ___      _   _       _       
  /  __ \ |                  (_)   | |            |  \/  |     | | | |     (_)    
  | /  \/ |__   ___ _ __ ___  _ ___| |_ _ __ _   _| .  . | __ _| |_| |__    _ ___ 
  | |   | '_ \ / _ \ '_ ` _ \| / __| __| '__| | | | |\/| |/ _` | __| '_ \  | / __|
  | \__/\ | | |  __/ | | | | | \__ \ |_| |  | |_| | |  | | (_| | |_| | | |_| \__ \
   \____/_| |_|\___|_| |_| |_|_|___/\__|_|   \__, \_|  |_/\__,_|\__|_| |_(_) |___/
                                            __/ |                       _/ |    
                                           |___/                       |__/     */

var avogadros = 6.0221413e23;


var MENDELEEVIUM_MODULE_OBJECT;

// TODO: write a better function for getting the element property


/* Function for merging `sublist` into `main` list
 * 
 * returns the result as a new array
 * if unique is set to true, adds elements to main only if not already present in the list
*/ 
function mergeLists( main, sublist, unique )
{
    if ( typeof unique == "undefined" )
    {
        unique = false;
    }
    else
    {
        unique = unique;
    }
    
    for ( var i = 0; i < sublist.length; i++ )
    {
        if (!unique || main.indexOf( sublist[i]) === -1 )
        {
            main.push( sublist[i] );
        }
    }
    return main;
};

/* Used for exact cloning of objects including methods and constructor
 *
 * returns an exact copy of object `obj`
*/
function clone( obj ) 
{
    var target = new obj.constructor();
    for ( var i in obj ) 
    {
        if ( obj.hasOwnProperty(i) ) 
        {
            if ( obj[i] instanceof Object )
            {
                target[i] = clone( obj[i] );
            }
            else
            {
                target[i] = obj[i];
            }
        }
    }
    return target;
};


/* Greatest common divisor
 *
 * returns the GCD of the numbers in the array `array`
 */
function gcd( array )
{
    var x, y;
    if ( array[0] < 0 )
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
};

/* Lowest common multiple
 *
 * returns the LCM of the integers in the array `array`
 * array is an integer array (e.g. [-50,25,-45,-18,90,447])
 */
function lcm( array )
{   
    var a = Math.abs( array[0] );
    for ( var i = 1; i < array.length; i++ )
    { 
        var b = Math.abs( array[i] ), c = a;
        while ( a && b )
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
        a = Math.abs( c * array[i] ) / ( a + b );
    }
    return a;
};

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
