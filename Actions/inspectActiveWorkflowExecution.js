/**
 * @description Demonstrates reflection capabilities for the current workflow execution.
 *              Logs details about the workflow instance, its "Class" (rootWorkflow), 
 *              and its input parameters (general declaration and current values).
 * @note JSDoc generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @returns {void}
 */

// Phase 1: Contextual Self-Analysis
var currentWorkflowToken = workflow;
System.debug("Resolving Workflow Token: " + currentWorkflowToken);

System.debug("Execution Metadata:");
System.debug(" - Start Date:     " + currentWorkflowToken.startDate);
System.debug(" - Business State: " + currentWorkflowToken.businessState);

// Phase 2: Structural Analysis (The "Class" Definition)
var parentWorkflowDefinition = currentWorkflowToken.rootWorkflow;
System.debug("Parent Workflow Definition: " + parentWorkflowDefinition);

var declaredInputsArray = parentWorkflowDefinition.inParameters;
System.debug("Discovered Input Declarations (" + (declaredInputsArray ? declaredInputsArray.length : 0) + "):");

var i;
for (i = 0; i < declaredInputsArray.length; i++) {
    var parameterDefinition = declaredInputsArray[i];
    // Pattern: [Type] ::: [Name] ::: [Description]
    System.debug(" -> " + parameterDefinition.type + " ::: " + parameterDefinition.name + " ::: " + (parameterDefinition.description || "[No Description]"));
}

// Phase 3: Runtime State Analysis (Token values)
var runtimeActiveInputsProps = currentWorkflowToken.getInputParameters();
System.debug("Active Runtime Input values discovered.");

var inputKeyList = runtimeActiveInputsProps.keys;
var j;
for (j = 0; j < inputKeyList.length; j++) {
    var keyIdentifier = inputKeyList[j];
    var resolvedValue = runtimeActiveInputsProps.get(keyIdentifier);
    
    // Pattern: [Key] :::: [Value]
    System.debug(" => " + keyIdentifier + " :::: " + resolvedValue);
}

System.log("Reflection complete for workflow instance " + currentWorkflowToken.id);

return null;
