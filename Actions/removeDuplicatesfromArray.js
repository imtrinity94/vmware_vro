/**
 * Removes duplicate items from an array.
 * Offers both a sorted (faster for primitive types) and unsorted (preserves order) algorithm.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {Array} a Input array with potential duplicates.
 * @param {boolean} doSort If true, sorts the array before removing duplicates.
 * @returns {Array|null} A new array with unique items, or null if input is invalid.
 */

var result = (doSort) ? removeDupesSorted(a) : removeDupesUnsorted(a);
return result;

/**
 * Removes duplicates from a sorted array.
 * @private
 */
function removeDupesSorted(arr) {
    var b = new Array();
    if (!arr) { return null; }
    if (arr.length === 0) { return b; }

    var sortedArr = arr.slice().sort(); // Clone and sort to avoid modifying original if passed by reference
    b.push(sortedArr[0]);

    for (var i = 0; i < sortedArr.length - 1; i++) {
        if (sortedArr[i + 1] != sortedArr[i]) {
            b.push(sortedArr[i + 1]);
        }
    }
    return b;
}

/**
 * Removes duplicates from an unsorted array while preserving order.
 * @private
 */
function removeDupesUnsorted(arr) {
    var b = new Array();
    if (!arr) { return null; }
    if (arr.length === 0) { return b; }

    for each (var x in arr) {
        if (!isPresent(x, b)) {
            b.push(x);
        }
    }
    return b;
}

/**
 * Checks if a value is present in an array.
 * @private
 */
function isPresent(x, arr) {
    if (arr) {
        for each (var y in arr) {
            if (x === y) {
                return true;
            }
        }
    }
    return false;
}
