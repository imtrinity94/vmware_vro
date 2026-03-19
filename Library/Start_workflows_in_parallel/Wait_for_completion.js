/**
 * Wait for completion
 *
 * @param {Array/WorkflowToken} wfTokens
 * @return {Array/WorkflowToken} worfklowTokens
 */
var allComplete = false;
while(! allComplete){
	System.sleep(15000); // Wait 15 seconds
	allComplete = true;
	for(var i=0; i<wfTokens.length; i++){
		if(wfTokens[i].state != "running" && wfTokens[i].state != "waiting" && wfTokens[i].state != "waiting-signal") {
			// completed, error or canceled
			System.log("Workflow '"+wfTokens[i].name+"' ("+i+") terminated with status '"+wfTokens[i].state+"'"); 
			Server.log("Workflow '"+wfTokens[i].name+"' ("+i+") terminated with status '"+wfTokens[i].state+"'"); 
		}
		else {
			// running or waiting
			allComplete = false;
		}
	}
}

var worfklowTokens = new Array();
for (var i in wfTokens) {
	worfklowTokens.push(wfTokens[i]);
}
System.log("All workflows completed");
Server.log("All workflows completed");