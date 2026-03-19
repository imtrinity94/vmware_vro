/**
 * @description Enumerates all input parameters of the root (parent) workflow and serializes
 *              them into a JSON string by looking up current values from the workflow context.
 * @note JSDoc generated via Antigravity AI IDE and can be reasonably incorrect.
 *
 * @returns {string} inputsJsonString - A JSON string representation of all workflow input parameters as key-value pairs.
 */

// Get all input parameters for the parent workflow
var rootInParamsArray = workflow.rootWorkflow.inParameters;

// Get all input parameters for the current workflow to search through later
var inputParamFinder = workflow.getInputParameters();

// Create a new object to store each of the input parameters as key-value pairs
var workflowInputsMap = {};

// Loop through each input parameter name from inParamsArray and lookup the value
var i;
for (i = 0; i < rootInParamsArray.length; i++) {
    var parameterName = rootInParamsArray[i].name;
    var parameterValue = inputParamFinder.get(parameterName);
    workflowInputsMap[parameterName] = parameterValue;
}

// Convert map to JSON
var inputsJsonString = JSON.stringify(workflowInputsMap);

System.log("Workflow inputs translated to JSON: " + inputsJsonString);

return inputsJsonString;
