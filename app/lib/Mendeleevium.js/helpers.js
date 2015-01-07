/* General functions for math and object operatoins */

function Helpers() {
    
}

/* Function for merging `sublist` into `main` list
 * 
 * returns the result as a new array
 * if unique is set to true, adds elements to main only if not already present in the list
*/ 
Helpers.prototype.mergeLists = function( main, sublist, unique )
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
Helpers.prototype.clone = function( obj ) 
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
Helpers.prototype.gcd = function( array )
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
Helpers.prototype.lcm = function( array )
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


if ( module.exports ) {
    module.exports = Helpers
}