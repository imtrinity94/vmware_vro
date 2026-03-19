/**
 * Check answer file
 *
 * @param {string} status
 */
if (status != "valid") {
    System.log("Answer file is NOT valid!");
    throw "Answer file is not valid for the provided host profile!";
}