/**
 * @description Checks whether a given element exists within an array using a regular expression test.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {Array} array - The array to search within.
 * @param {*} element - The element to look for in the array.
 * @returns {boolean} True if the element is found in the array, false otherwise.
 */

var result = new RegExp('^(' + array.join('|') + ')$').test(element);
return result;
