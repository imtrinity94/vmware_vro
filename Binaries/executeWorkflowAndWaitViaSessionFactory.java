/*
 * Java SDK code snippet summary:
 * 
 * 1. Establish session using DefaultVcoSessionFactory.newLdapSession.
 * 2. Instantiate WorkflowService and ExecutionService.
 * 3. Locate workflow by ID via workflowService.getWorkflow.
 * 4. Build ExecutionContext with parameters.
 * 5. Trigger execution using executionService.execute.
 * 6. Await specific terminal states (COMPLETED, FAILED, CANCELED).
 * 7. Extract output parameters using ParameterExtractor.
 */

VcoSession vcoSession = DefaultVcoSessionFactory.newLdapSession(new URI("https://vro-server:8281/vco/api/"), "domain\\user", "secret");

WorkflowService wfSvc = new WorkflowService(vcoSession);
ExecutionService execSvc = new ExecutionService(vcoSession);

Workflow targetWf = wfSvc.getWorkflow("f7832-..."); 

ExecutionContext wfContext = new ExecutionContextBuilder()
    .addParam("vmName", "DemoVM")
    .addParam("memoryMB", 4096)
    .build();

WorkflowExecution wfExec = execSvc.execute(targetWf, wfContext);

wfExec = execSvc.awaitState(wfExec, 1000, 60,
    WorkflowExecutionState.CANCELED,
    WorkflowExecutionState.FAILED,
    WorkflowExecutionState.COMPLETED);

String resultId = new ParameterExtractor().fromTheOutputOf(wfExec).extractString("provisionedId");
System.out.println("Workflow finished. Provisioned ID: " + resultId);
