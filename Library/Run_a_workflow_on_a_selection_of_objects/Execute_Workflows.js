/**
 * Execute Workflows
 *
 * @param {Action} actionInput
 * @param {VC:HostSystem} host
 * @param {VC:VmFolder} vmfolder
 * @param {VC:ResourcePool} resourcePool
 * @param {Workflow} workflowsParam
 * @param {string} objectType
 * @param {VC:ClusterComputeResource} cluster
 * @param {VC:ComputeResource} computeResource
 * @param {VC:Datacenter} datacenter
 * @param {VC:VirtualMachine} vm
 * @param {VC:SdkConnection} sdkConnection
 * @param {VC:Datastore} datastore
 * @param {VC:Network} network
 * @param {VC:VirtualMachineGuestOsIdentifier} os
 * @param {boolean} simulate
 * @param {string} customAttributeName
 * @param {string} customAttributeValue
 * @param {boolean} chooseAction
 * @param {Array/VC:VirtualMachine} vmArray
 * @param {Array/VC:ResourcePool} resourcePoolArray
 * @param {Array/VC:VmFolder} vmFolderArray
 * @param {Array/VC:HostSystem} hostArray
 * @param {Array/VC:Datacenter} datacenterArray
 * @param {string} stringParam
 * @param {Array/VC:Datastore} datastoreArray
 * @return {Array/WorkflowToken} wfTokens
 */
// Set the action input parameter
var param = null;
if (host != null) {
	param = host;
}
else if (vmfolder != null) {
	param = vmfolder;
}
else if (resourcePool != null) {
	param = resourcePool;
}
else if (cluster != null) {
	param = cluster;
}
else if (computeResource != null) {
	param = computeResource;
}
else if (datacenter != null) {
	param = datacenter;
}
else if (vm != null) {
	param = vm;
}
else if (sdkConnection != null) {
	param = sdkConnection;
}
else if (network != null) {
	param = network;
}
else if (datastore != null) {
	param = datastore;
}
else if (os != null) {
	param = os;
}
else if (stringParam != null) {
	param = stringParam;
}

var actionResult;
if(chooseAction){
	// Run the selected action with the chosen input parameter (if any)
	var methodCall = "System.getModule(\"" + actionInput.module.name + "\")." + actionInput.name + "( param )";
	actionResult = eval( methodCall );
}else{
	if(objectType=="VirtualMachine"){
		actionResult=vmArray;
	}else if(objectType=="VmFolder"){
		actionResult=vmFolderArray;
	}else if(objectType=="ResourcePool"){
		actionResult=resourcePoolArray;
	}else if(objectType=="Host"){
		actionResult=hostArray;
	}else if(objectType=="Datacenter"){
		actionResult=datacenterArray;
	}else if(objectType=="Datastore"){
		actionResult=datastoreArray;
	}
}

wfTokens= new Array();
if(actionResult!=null && actionResult.length>0){
	// If Simulate was requested, just display which objects will be affected
	if (simulate) {
		System.log("The workflow will run aginst the following objects");
		for (i in actionResult) {
			System.log(actionResult[i].name);
		}
		System.log("NB: No workflows have been run.");
		System.log("If you want to run the workflow '" + workflowsParam.name + "' against all the elements listed above, execute the workflow again and set the simulation mode to 'No'.");
	}
	else
	{
		System.log("***Starting executing the workflow '" + workflowsParam.name + "' on objects of type : " +objectType+ "***");
		// Run the selected workflow for each item returned by the action
		for (i in actionResult) {
			var workflowParameters = new Properties();
			var workflowInputParameterName = workflowsParam.inParameters[0].name;
			workflowParameters.put(workflowInputParameterName, actionResult[i]);
			
			// Workflow specific parameters
			if (customAttributeName!= null) {
				workflowParameters.put("customAttributeName", customAttributeName);
			}
			if (customAttributeValue!= null) {
				workflowParameters.put("newValue", customAttributeValue);
			}	
	
			var wfToken = workflowsParam.execute(workflowParameters);
			System.log("object["+i+"]: '"+actionResult[i].name +"' => The workflow is running... ");
			wfTokens.push(wfToken);
		}
	}
}else{
	if(chooseAction){
		System.log("The action return no objects so the workflow will not be executed.");
	}else{
		System.log("You don't enter any object in the array so the workflow will not be executed.");
	}
}
