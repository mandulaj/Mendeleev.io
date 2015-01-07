/*
 _____                  _   _               _     
|  ___|                | | (_)             (_)    
| |__  __ _ _   _  __ _| |_ _  ___  _ __    _ ___ 
|  __|/ _` | | | |/ _` | __| |/ _ \| '_ \  | / __|
| |__| (_| | |_| | (_| | |_| | (_) | | | |_| \__ \
\____/\__, |\__,_|\__,_|\__|_|\___/|_| |_(_) |___/
         | |                              _/ |    
         |_|                             |__/     */

if ( module.exports ) { // We are in node
    var Helpers = require('./helpers.js');
} else {
    if (typeof Helpers == 'undefined') {
        throw "Modules not defined";
    }
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

if ( module.exports ) {
    module.exports = Equation;
}