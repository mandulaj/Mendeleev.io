// Equation ***************************************************************************
/*
 * used for storing and manipulating Equations
 * 
 * Properties:
 *  Equation.leftHandSide   - a Expression object containing the left-hand side of the equation 
 *  Equation.rightHandSide  - a Expression object containing the right-hand side of the equation
 * 
 * Methods:
 *  Equation.balance()   - automatically balances the right-hand and left-hand side
 *  Equation.printable() - returns a printable version of Equation (inverse of parse)
*/
function Equation ( left_expression, right_expression )
{
	this.leftHandSide = left_expression;
	this.rightHandSide = right_expression;

}

Equation.prototype.balance = function()
{
 // TODO: implement balance
    console.log( this.leftHandSide.listElements() );
};

Equation.prototype.printable = function()
{
    return this.leftHandSide.printable() + " = " + this.rightHandSide.printable();
};