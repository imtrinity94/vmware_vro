// Get all input parameters for the parent workflow
var inParamsArray = workflow.rootWorkflow.inParameters;

// Get all input parameters for the current workflow to search through later
var paramFinder = workflow.getInputParameters();

// Create a new object to store each of the input parameters as a key:value object
var paramsObjArray = new Object();

// Loop through each input parameter name from inParamsArray and lookup the value for each input
for (var i=0; i < inParamsArray.length; i++){
	var paramName = inParamsArray[i].name;
	var paramValue = paramFinder.get(paramName);
	paramsObjArray[paramName] = paramValue; // Create a new object inside paramsObjArray with the name 'paramName' and the value 'paramValue'
	}

// Convert the paramsObjArray object to JSON
var paramsJSON = JSON.stringify(paramsObjArray);

// Log JSON contents
System.log("Workflow inputs in JSON format: " + paramsJSON);

return paramsJSON;
