/**
 * Populate ConfigurationElement with workflows
 *
 * @param {ConfigurationElement} configurationElement
 */
var workflowCategories = Server.getAllWorkflowCategories();
System.log("Categories: " + workflowCategories.length);
for each (category in workflowCategories) {
	System.log("Checking category: " + category.name);
	for each (workfloww in category.allWorkflows) {
		System.log("Checking workflow: " + workfloww.name);
		//look if the workflow has only one parameter
		if(workfloww.inParameters.length==1){
			//look the type of the input parameter
			if(workfloww.inParameters[0].type=="VC:VirtualMachine"){
				var array = configurationElement.getAttributeWithKey("VirtualMachine").value;
				array.push(workfloww);
				configurationElement.setAttributeWithKey("VirtualMachine",array);
				//System.log(workfloww.name + " => VirtualMachine");
			}else if(workfloww.inParameters[0].type=="VC:ResourcePool"){
				var array = configurationElement.getAttributeWithKey("ResourcePool").value;
				array.push(workfloww);
				configurationElement.setAttributeWithKey("ResourcePool",array);
				//System.log(workfloww.name + " => ResourcePool");
			}else if(workfloww.inParameters[0].type=="VC:VmFolder"){
				var array = configurationElement.getAttributeWithKey("VmFolder").value;
				array.push(workfloww);
				configurationElement.setAttributeWithKey("VmFolder",array);
				//System.log(workfloww.name + " => VmFolder");
			}else if(workfloww.inParameters[0].type=="VC:HostSystem"){
				var array = configurationElement.getAttributeWithKey("Host").value;
				array.push(workfloww);
				configurationElement.setAttributeWithKey("Host",array);
				//System.log(workfloww.name + " => Host");
			}else if(workfloww.inParameters[0].type=="VC:Datacenter"){
				var array = configurationElement.getAttributeWithKey("Datacenter").value;
				array.push(workfloww);
				configurationElement.setAttributeWithKey("Datacenter",array);
				//System.log(workfloww.name + " => Datacenter");
			}else if(workfloww.inParameters[0].type=="VC:Datastore"){
				var array = configurationElement.getAttributeWithKey("Datastore").value;
				array.push(workfloww);
				configurationElement.setAttributeWithKey("Datastore",array);
				System.log(workfloww.name + " => Datastore");
			}
		} else if(workfloww.name=="Add custom attribute for VM"){
			var array = configurationElement.getAttributeWithKey("VirtualMachine").value;
			array.push(workfloww);
			configurationElement.setAttributeWithKey("VirtualMachine",array);
		}
	}
}
