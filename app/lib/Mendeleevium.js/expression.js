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