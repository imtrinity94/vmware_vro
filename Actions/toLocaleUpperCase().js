/**
 * Demonstrates the use of `String.prototype.toLocaleUpperCase()` in vRO
 * with various locale identifiers, including Turkish locale-specific casing.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @returns {void}
 */

// How to use String.toLocaleUpperCase() function in vRO

var city = 'istanbul';

System.log("Default UpperCase: " + city.toUpperCase());
System.log("English UpperCase: " + city.toLocaleUpperCase('en-US'));
// expected output: "ISTANBUL"

System.log("Turkish UpperCase: " + city.toLocaleUpperCase('TR'));
// expected output: "İSTANBUL"

System.log("Alphabet: " + 'alphabet'.toLocaleUpperCase()); 

System.log("German: " + 'Gesäß'.toLocaleUpperCase()); 

System.log("Lithuanian special case: " + 'i\u0307'.toLocaleUpperCase('lt-LT')); 

var locales = ['lt', 'LT', 'lt-LT', 'lt-u-co-phonebk', 'lt-x-lietuva'];
System.log("Lithuanian batch locales: " + 'i\u0307'.toLocaleUpperCase(locales)); 
