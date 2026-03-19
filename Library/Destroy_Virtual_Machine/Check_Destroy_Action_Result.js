/**
 * Check Destroy Action Result
 *
 * @param {string} result
 */
System.log("Destroy vm result: " + result);
if (result != "SUCCESSFUL") {
    throw "Destroy vm failed";
}