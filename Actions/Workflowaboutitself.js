/**
 * Demonstrates reflection capabilities for the current workflow execution.
 * Logs details about the workflow instance, its "Class" (rootWorkflow), 
 * and its input parameters (general declaration and current values).
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 */

// get the current workflow token /"instance"
var token = workflow;
System.debug(token);

// get some details about the current workflow token/execution/instance
System.debug("startDate: " + token.startDate);
System.debug("businessState: " + token.businessState);
// System.debug("you might want to send me via email...: " +  token.getAnswerUrl().url);

// get the Workflow-"Class" of the current token
var rootWorkflow = workflow.rootWorkflow;
System.debug(rootWorkflow);

// get "declaration": Array of Input Parameters of the workflow in general 
var inParams = rootWorkflow.inParameters;
System.debug("inParams: " + inParams);

// loop through array and print out details for each parameter
for (var i in inParams) {
    var loopParam = inParams[i];
    // print out in type:::name:::description
    System.debug(loopParam.type + ":::" + loopParam.name + ":::" + loopParam.description);
}

// get the current token's inParameters (they include the values, and are returned as Properties (key : values tuples))
var curInParams = token.getInputParameters();
System.debug("curInParams: " + curInParams);

// crawl through the Properties
var keys = curInParams.keys;
for (var i in keys) {
    var curKey = keys[i];
    // print out properties in format key :::: value
    var curValue = curInParams.get(curKey);
    System.debug(curKey + " :::: " + curValue);
}
