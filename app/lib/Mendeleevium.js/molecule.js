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
 *  Molecule.listElements()                 - returns an array of all individual elements in the Molecule e.g. water => ["H","O"]
 *  Molecule.formulaMass([moles])           - mass of [moles]/n_moles moles of molecule
 *  Molecule.percentageComposition(element) - percentage composition of `element` in molecule
 *  Molecule.toEmpirical( clone )           - reduces Molecule to empirical form. If clone is true returns a clone, else changes this
 *  Molecule.printable()                    - returns a printable version of Molecule (debugging) e.g. "CH4", "H2O" (inverse of parse)
 *  Molecule.simplify( clone )              - returns a simplified expanded version of Molecule - 2CO3(SO4) => C2O6S2O4 => C2O10S2 manipulates this if clone = false
 *  Molecule.expand( clone )                - expands molecule numbers to each element - 2CO2 => C2O4, 2(SO4)2 => S4O16  manipulates this if clone = false
 *  Molecule.getAtoms()                     - returns a cloned list of all atoms in molecule
 *  Molecule.getListOfAtomNums()            - returns a ordered list of all atom numbers e.g. CO2 => [1,2], FeSO4 => [1,1,4], etc...
*/
function Molecule( moles, molecule )
{
	this.n_moles = moles;
	this.molecule = molecule;
}

Molecule.prototype.numOfElement = function( element )
{
	var i,
        numOfElem = 0;
    for ( i = 0; i < this.molecule.length; i++ )
    {
        if ( this.molecule[i] instanceof Atom )
        {
            if ( this.molecule[i].getAtomName() === element )
            {
                numOfElem += parseInt( this.molecule[i].getNumOfAtoms() );
            }
        }
        else if ( this.molecule[i] instanceof Molecule )
        {
            // If part of molecule is a sub-molecule
            numOfElem += parseInt( this.molecule[i].numOfElement( element ) );
        }
    }
    numOfElem *= this.n_moles;
    return numOfElem;
};

Molecule.prototype.listElements = function()
{
    var listOfElem = [];
    for ( var i = 0; i < this.molecule.length; i++ )
    {
        if ( this.molecule[i] instanceof Atom )
        {
            var element = this.molecule[i].getAtomName();
            if ( listOfElem.indexOf(element) === -1 )
            {
                listOfElem.push( element );
            }
        }
        else if ( this.molecule[i] instanceof Molecule )
        {
            var list = this.molecule[i].listElements();
            listOfElem = mergeLists( listOfElem, list, true );
        }
        
    }
    return listOfElem;
};

Molecule.prototype.formulaMass = function( moles )
{
    if ( typeof moles === 'undefined' )
    {
        moles = this.n_moles;
    }
    else
    {
        moles = moles;
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
};

Molecule.prototype.percentageComposition = function( element )
{
    var totalMass = this.formulaMass();
    var numOfElem = this.numOfElement( element );
    
    var tempElement = new Atom( element, numOfElem );
    var massElement = tempElement.getMass();
    
    return massElement/totalMass;
};


Molecule.prototype.toEmpirical = function( clone )
{
    if ( typeof clone == "undefined" )
    {
        clone = true;
    }
    else
    {
        clone = clone;
    }
    var listOfns = [];
    var copyMolecule = this.simplify();
    for ( var i = 0; i < copyMolecule.length; i++ )
    {
        listOfns[i] = copyMolecule[i].getNumOfAtoms();
    }
    var gcd = gcd(listOfns);
    for ( var i = 0; i < copyMolecule.length; i++ )
    {
        copyMolecule[i].setNumOfAtoms( listOfns[i]/gcd );
    }
    
    if ( clone )
    {
        return copyMolecule;
    }
    else
    {
        this.molecule = copyMolecule;
        return this;
    }
};

Molecule.prototype.printable = function( molesInFront )
{
    if ( typeof molesInFront == "undefined" )
    {
        molesInFront = true;
    }
    else
    {
        molesInFront = molesInFront;
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
        if ( molesInFront )
        {
            return this.n_moles + returnString;
        }
        else
        {
            return returnString;
        }
    }
};

Molecule.prototype.simplify = function( clone )
{
    if ( typeof clone == "undefined" )
    {
        clone = true;
    }
    else
    {
        clone = clone;
    }
    
    var moleculeCopy = this.expand( true );
    var newMolecule = [];
    
    for ( var i = 0; i < moleculeCopy.length; i++ )
    {
        var breakFlag = false;
        if ( newMolecule.length === 0 )
        {
            newMolecule.push( moleculeCopy[i] );
            continue;
        }
        for ( var j = 0; j < newMolecule.length; j++ )
        {
            if ( moleculeCopy[i].getAtomName() === newMolecule[j].getAtomName() )
            {
                newMolecule[j].setNumOfAtoms( newMolecule[j].getNumOfAtoms() + moleculeCopy[i].getNumOfAtoms() );
                breakFlag = true;
                break;
            }
        }
        if ( !breakFlag )
        {
             newMolecule.push( moleculeCopy[i] );
        }
    }
    if ( clone )
    {
        return newMolecule;
    }
    else
    {
        this.molecule = newMolecule;
    }
};

Molecule.prototype.expand = function( copy )
{
    if ( typeof copy == "undefined" )
    {
        copy = true;
    }
    else
    {
        copy = copy;
    }
    
    var newMolecule = [];
    for ( var i = 0; i < this.molecule.length; i++ )
    {
        if ( this.molecule[i] instanceof Molecule )
        {
            var molecule = this.molecule[i].expand();
            for ( var j = 0; j < molecule.length; j++ )
            {
                molecule[j].setNumOfAtoms( molecule[j].getNumOfAtoms() * this.n_moles );
            }
            newMolecule = mergeLists( newMolecule, molecule, false );
        }
        else if ( this.molecule[i] instanceof Atom )
        {
            var temp = clone( this.molecule[i] );
            temp.setNumOfAtoms( temp.getNumOfAtoms() * this.n_moles );
            newMolecule.push( temp );
        }
    }
    if (copy) 
    {
        return newMolecule;
    }
    else
    {
        this.molecule = newMolecule;
    }
};


Molecule.prototype.getAtoms = function()
{
    var returnList = [];
    for ( var i = 0; i < this.molecule.length; i++ )
    {
        returnList[i] = clone( this.molecule[i] );
    }
    return returnList;
};

Molecule.prototype.getListOfAtomNums = function()
{
    var list = [];
    for ( var i = 0; i < this.molecule.length; i++ )
    {
        if ( this.molecule[i] instanceof Atom )
        {
            list.push( this.molecule[i].getNumOfAtoms() );
        }
        else if ( this.molecule[i] instanceof Molecule )
        {
            var sublist = this.molecule[i].getListOfAtomNums();
            
            list = listOfElem( list, sublist ); // TODO: TEST - I think I wanted to say mergeLists
        }
    }
    return list;
};

if ( module.exports ) {
    module.exports = Molecule;
}