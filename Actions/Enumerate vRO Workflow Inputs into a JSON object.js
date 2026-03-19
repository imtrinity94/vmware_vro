/**
 * @description Enumerates all input parameters of the root (parent) workflow and serializes
 *              them into a JSON string by looking up current values from the workflow context.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @returns {string} A JSON string representation of all workflow input parameters as key-value pairs.
 */

// Get all input parameters for the parent workflow
var inParamsArray = workflow.rootWorkflow.inParameters;

// Get all input parameters for the current workflow to search through later
var paramFinder = workflow.getInputParameters();

// Create a new object to store each of the input parameters as a key:value object
var paramsObjArray = new Object();

// Loop through each input parameter name from inParamsArray and lookup the value for each input
for (var i = 0; i < inParamsArray.length; i++) {
    var paramName = inParamsArray[i].name;
    var paramValue = paramFinder.get(paramName);
    // Create a new object inside paramsObjArray with the name 'paramName' and the value 'paramValue'
    paramsObjArray[paramName] = paramValue;
}

// Convert the paramsObjArray object to JSON
var paramsJSON = JSON.stringify(paramsObjArray);

// Log JSON contents
System.log("Workflow inputs in JSON format: " + paramsJSON);

return paramsJSON;
