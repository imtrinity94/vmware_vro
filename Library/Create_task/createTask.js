/**
 * Create a Automation Orchestrator Task. Return the newly created task
 *
 * @param {Workflow} workflowToCall
 * @param {Date} date
 * @param {Properties} workflowArguments
 * @return {Task} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.tasks").createTask(workflowToCall,date,workflowArguments) ;