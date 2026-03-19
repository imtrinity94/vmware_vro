/**
 * Retry?
 *
 * @param {string} errorCode
 * @param {number} retryTime
 * @return {number} retryTime
 */
System.log(errorCode);
if (--retryTime < 0) {
    throw "Can't register vm to vRA";
}