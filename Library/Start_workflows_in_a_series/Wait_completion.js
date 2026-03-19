/**
 * Wait completion
 *
 * @param {WorkflowToken} currentToken
 * @param {Array/WorkflowToken} terminatedTokens
 * @return {Array/WorkflowToken} terminatedTokens
 */
var complete = false;
while(complete == false){
	if(currentToken != null && (currentToken.state != "running" && currentToken.state != "waiting")){
		System.log("Workflow '"+currentToken.name+"' terminated with status '"+currentToken.state+"'");
		Server.log("Workflow '"+currentToken.name+"' terminated with status '"+currentToken.state+"'");
		complete = true;
	}
}
terminatedTokens.push(currentToken);