/**
 * Execute wf
 *
 * @param {Workflow} wf
 * @param {Properties} currentParameters
 * @param {Array/WorkflowToken} wfTokens
 * @return {Array/WorkflowToken} wfTokens
 */
var token = wf.execute(currentParameters);
wfTokens.push(token);