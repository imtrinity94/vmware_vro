/**
 * @description Demonstrates how to run a vRO workflow via the vRO Java SDK session factory
 *              and wait for its completion. This is a Java SDK code snippet (not native vRO JS).
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @returns {void}
 */

// Start a new session to Orchestrator by using specified credentials
VcoSession session = DefaultVcoSessionFactory.newLdapSession(new URI("https://orchestrator-server:8281/vco/api/"), "username", "password");

// Create the services
WorkflowService workflowService = new WorkflowService(session);
ExecutionService executionService = new ExecutionService(session);

// Find a workflow by ID
Workflow workflow = workflowService.getWorkflow("1231235");

// Create an ExecutionContext from the user's input
ExecutionContext context = new ExecutionContextBuilder().addParam("name", "Jerry").addParam("age", 18).build();

// Run the workflow
WorkflowExecution execution = executionService.execute(workflow, context);

// Wait for the workflow to reach the user interaction state, checking every 500 milliseconds
execution = executionService.awaitState(execution, 500, 10, WorkflowExecutionState.CANCELED, WorkflowExecutionState.FAILED, WorkflowExecutionState.COMPLETED);

String nameParamValue = new ParameterExtractor().fromTheOutputOf(execution).extractString("name");
System.out.println("workflow was executed with 'name' input set to" + nameParamValue);
