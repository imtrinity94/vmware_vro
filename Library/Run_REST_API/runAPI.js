/**
 * Run REST API on given FlashArray
 *
 * @param {PS:FlashArray} flashArray - [object Object]
 * @param {string} httpMethod - [object Object]
 * @param {string} body - [object Object]
 * @param {string} uri - [object Object]
 * @return {string} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.purestorage.flasharray.restapi").runAPI(flashArray,httpMethod,body,uri) ;