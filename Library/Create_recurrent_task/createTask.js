/**
 * Create an Automation Orchestrator Task. Return the newly created task
 *
 * @param {Workflow} workflowToCall
 * @param {Properties} workflowArguments
 * @param {string} username
 * @param {Date} startDate
 * @param {string} recurrencePattern
 * @param {string} recurrenceCycle
 * @param {string} password
 * @param {Date} endDate
 * @return {Task} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.tasks").createRecurrentTask(workflowToCall,startDate,endDate,recurrencePattern,recurrenceCycle,workflowArguments,username,password) ;