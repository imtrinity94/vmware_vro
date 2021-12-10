var edgeGatewayTasks = param.tasks;
if(edgeGatewayTasks != null){
	for each (var i in edgeGatewayTasks.getTasks()) 
		System.log(i.operation + "  >> "+i.status);
		System.log(i.operationName + "  >> "+i.status);
}
//param.update();

/*Output:
[2019-09-17 00:42:02.372] [I] Redeploying EdgeGateway eg_LIDC_16091516-01(f4e43594-ac4e-4614-bcdf-beb955de2028)  >> running
[2019-09-17 00:42:02.374] [I] networkEdgeGatewayRedeploy  >> running
*/
