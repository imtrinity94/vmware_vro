var allTokens = Server.findAllForType('WorkflowToken');
var currentUser = Server.getCredential().username;
var res = [];
for(var i = 0; i<allTokens.length; i++){
	if(allTokens[i].runningUserName == currentUser){
	  res.push(allTokens[i]);
	}
}
return res;
