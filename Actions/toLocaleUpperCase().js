/**
 * @description Demonstrates the use of `String.prototype.toLocaleUpperCase()` in vRO
 *              with various locale identifiers, including Turkish locale-specific casing.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @returns {void}
 */

// How to use String.toLocaleUpperCase() function in vRO

var city = 'istanbul';

System.log(city.toLocaleUpperCase('en-US'));
// expected output: "ISTANBUL"

System.log(city.toLocaleUpperCase('TR'));
// expected output: "İSTANBUL"

'alphabet'.toLocaleUpperCase(); // 'ALPHABET'

'Gesäß'.toLocaleUpperCase(); // 'GESÄSS'

'i\u0307'.toLocaleUpperCase('lt-LT'); // 'I'

var locales = ['lt', 'LT', 'lt-LT', 'lt-u-co-phonebk', 'lt-x-lietuva'];
'i\u0307'.toLocaleUpperCase(locales); // 'I'
