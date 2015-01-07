/*
  ___  _                    _     
 / _ \| |                  (_)    
/ /_\ \ |_ ___  _ __ ___    _ ___ 
|  _  | __/ _ \| '_ ` _ \  | / __|
| | | | || (_) | | | | | |_| \__ \
\_| |_/\__\___/|_| |_| |_(_) |___/
                          _/ |    
                         |__/     */

if ( module.exports ) { // We are in node
    var Helpers = require('./helpers.js');
} else {
    if (typeof Helpers == 'undefined') {
        throw "Modules not defined";
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
 *  Atom.getNumOfMoles( mass )  - returns number of moles that weigh mass grams
 *  Atom.setNumOfMoles( number )- sets number of moles to `number`
 *  Atom.printable()            - returns a printable representation of the Atom (debugging) eg: H2, C4, etc..  (inverse of parse)
*/ 
function Atom( element, number )
{
    this.element = element;
    this.n = number;
    this.property = getElementObject( element );
}

Atom.prototype.getNumOfAtoms = function()

{
    return parseInt(this.n); // always an int
};

Atom.prototype.getAtomName = function()
// TODO: This will be changed
{
    return this.element;
};


Atom.prototype.getMass = function()
{
    return parseFloat( this.property.atomic_weight * this.n );
};

Atom.prototype.getNumOfMoles = function( mass )
{
    return mass/this.property.atomic_weight;
};

Atom.prototype.setNumOfAtoms = function( number )
{
    this.n = number;
};

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
};


if ( module.exports ) {
    module.exports = Atom;
}