//get the current workflow token /"instance"
 var token = workflow;
 System.debug(token);
 
//get some details about the current workflow token/execution/instance
 System.debug("startDate: " + token.startDate);
 System.debug("businessState: " + token.businessState);
 
//get the Workflow-"Class" of the current token
 var rootWorkflow = workflow.rootWorkflow;
 System.debug(rootWorkflow);
 
// get "declaraction": Array of Input Parameters of the workflow in general
 var inParams = rootWorkflow.inParameters;
 System.debug("inParams: " + inParams);
 //loop through array and print out details for each parameter
 for (var i in inParams) {
 loopParam = inParams[i];
 //print out in type:::name:::description
 System.debug(loopParam.type + ":::"+ loopParam.name + ":::" + loopParam.description);
 }
 
// get the current token's inParameters (they include the values, and are returned as Properties
 //(key : values tuples)
 var curInParams = token.getInputParameters();
 System.debug("curInParams: " + curInParams);
 //crawl through the Properties
 var keys = curInParams.keys;
 for (var i in keys) {
 var curKey = keys[i];
 //print out properties in format key :::: value
 var curValue = curInParams.get(curKey)
 System.debug(curKey + " :::: " + curValue );
 }
