/**
 * Populate ConfigurationElement with actions
 *
 * @param {ConfigurationElement} configurationElementAction
 */
var modules = System.getAllModules();
for each (module in modules) {
	System.log("Checking module: " + module.name);
	for each (action in module.actionDescriptions) {
		System.log("Checking action: " + action);
		//look if the workflow has only one parameter
		if(action.parameters.length<=1 ){
			//look the return type of the action
			if(action.returnType=="Array/VC:VirtualMachine"){
				if(isParameterTypeGoodType(action.parameters[0])){
					var array = configurationElementAction.getAttributeWithKey("VirtualMachine").value;
					array.push(action);
					configurationElementAction.setAttributeWithKey("VirtualMachine",array);
				}
			}else if(action.returnType=="Array/VC:ResourcePool"){
				if(isParameterTypeGoodType(action.parameters[0])){
					var array = configurationElementAction.getAttributeWithKey("ResourcePool").value;
					array.push(action);
					configurationElementAction.setAttributeWithKey("ResourcePool",array);
				}
			}else if(action.returnType=="Array/VC:VmFolder"){
				if(isParameterTypeGoodType(action.parameters[0])){
					var array = configurationElementAction.getAttributeWithKey("VmFolder").value;
					array.push(action);
					configurationElementAction.setAttributeWithKey("VmFolder",array);
				}
			}else if(action.returnType=="Array/VC:HostSystem"){
				if(isParameterTypeGoodType(action.parameters[0])){
					var array = configurationElementAction.getAttributeWithKey("Host").value;
					array.push(action);
					configurationElementAction.setAttributeWithKey("Host",array);
				}
			}else if(action.returnType=="Array/VC:Datacenter"){
				if(isParameterTypeGoodType(action.parameters[0])){
					var array = configurationElementAction.getAttributeWithKey("Datacenter").value;
					array.push(action);
					configurationElementAction.setAttributeWithKey("Datacenter",array);
				}
			}else if(action.returnType=="Array/VC:Datastore"){
				if(isParameterTypeGoodType(action.parameters[0])){
					var array = configurationElementAction.getAttributeWithKey("Datastore").value;
					if(!array)
					array = new Array();
					array.push(action);
					configurationElementAction.setAttributeWithKey("Datastore",array);
					System.log(action.name + " => Datastore");
				}
			}
		}		
	}
}

//Check if the action parameter is a good type ( Good type are the type of the input parameter of the BatchObject workflow)
function isParameterTypeGoodType(param) {
	if(param!=null){
	var type = param.type;
		if(type=="VC:VirtualMachine" || type=="VC:HostSystem" || type=="VC:ResourcePool" || type=="VC:VmFolder" 
		|| type=="VC:ClusterComputeResource" || type=="VC:ComputeResource" || type=="VC:Datacenter" || type=="VC:SdkConnection" 
		|| type=="VC:Datastore" || type=="VC:Network" || type=="VC:VirtualMachineGuestOsIdentifier" || type=="string"){
			return true;
		}
	}else{
		//if there is no parameter for the action
		return true;
	}
	return false;
}
