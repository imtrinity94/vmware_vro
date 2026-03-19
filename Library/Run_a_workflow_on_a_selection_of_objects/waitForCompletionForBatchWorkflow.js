/**
 * Wait that the workflows are terminated
 *
 * @param {Array/WorkflowToken} wfTokens
 * @return {Array/WorkflowToken} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.vc.basic").waitForCompletionForBatchWorkflow(wfTokens) ;