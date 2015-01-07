/*
 _____                             _               _     
|  ___|                           (_)             (_)    
| |____  ___ __  _ __ ___  ___ ___ _  ___  _ __    _ ___ 
|  __\ \/ / '_ \| '__/ _ \/ __/ __| |/ _ \| '_ \  | / __|
| |___>  <| |_) | | |  __/\__ \__ \ | (_) | | | |_| \__ \
\____/_/\_\ .__/|_|  \___||___/___/_|\___/|_| |_(_) |___/
          | |                                    _/ |    
          |_|                                   |__/     */

if ( module.exports ) { // We are in node
    var Helpers = require('./helpers.js');
} else {
    if (typeof Helpers == 'undefined') {
        throw "Modules not defined";
    }
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
 *  Expression.printable()           - returns a printable representation of the Expression  (inverse of parse)
 *  Expression.listElements()        - returns a list of al unique elements in Expression
*/
function Expression( expression ) 
{
	this.expression = expression;
}

Expression.prototype.numOfElement = function( element )
{
    var i,
        numOfEle = 0;
    
    for ( i = 0; i < this.expression.length; i++ )
    {
        numOfEle += this.expression[i].numOfElement( element );
    }
    return numOfEle;
};

Expression.prototype.printable = function()
{
    var returnString = "",
        moleculeList = [];
    for ( var i = 0; i < this.expression.length; i++ )
    {
        moleculeList[i] = this.expression[i].printable();
    }
    returnString = moleculeList.join( " + " );
    return returnString;
};

Expression.prototype.listElements = function()
{
    var list = [];
    for ( var i = 0; i < this.expression.length; i++ )
    {
        var listInMolecule = this.expression[i].listElements();
        for ( var j = 0; j < listInMolecule.length; j++ )
        {
            if ( list.indexOf( listInMolecule[i] ) !== -1 )
            {
                list.push( listInMolecule[i] );
            }    
        }
    }
    return list;
};

if ( module.exports ) {
    module.exports = Expression;
}