//How to use String.toLocaleUpperCase() funtion in vRO

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
