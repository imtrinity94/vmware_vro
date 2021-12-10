//Inputs
//VC:HostSystem - host
//String - serviceName
//string - serviceAction
//string - policyAction


// Get the hostServiceSystem object from the host:
var hostServiceSystem = host.configManager.serviceSystem;

// refresh services info to make sure all properties are fresh:
hostServiceSystem.refreshServices();
// Get Service:
var serviceObj = null;
var services = hostServiceSystem.serviceInfo.service;
for each (svc in services){
	//System.log("Checking "+svc.key+" / "+serviceName);
	if(svc.key == serviceName){
		System.log("Service Found! "+svc.label);
		serviceObj = svc;
		break;
	}
}
if (serviceObj == null){
	throw "unable to locate service: "+serviceName+" on host: "+host.name;
}
switch(serviceAction){
	case "start":
		// before trying to start, make sure running is not true
		if (serviceObj.running != true){
			hostServiceSystem.startService(serviceObj.key);
		}
		break;
	case "stop":
		if (serviceObj.running == true){
			hostServiceSystem.stopService(serviceObj.key);
		}
		break;
	case "restart":
		hostServiceSystem.restartService(serviceObj.key);
		break;
	case "uninstall":
		try{
			hostServiceSystem.uninstallService(serviceObj.key);
		}catch(err){
			System.error("Error uninstalling service "+serviceObj.key+" ("+err+")");
			Server.error("Error uninstalling service "+serviceObj.key,serviceObj.key);
		}
		break;
	default:
		System.warn("Invalid service action selected");
		Server.warn("Invalid service action selected",serviceAction);
}

if(policyAction != null && policyAction != "" && policyAction != "No Change"){
	// only valid policy actions are: on, off, automatic
	try{
		hostServiceSystem.updateServicePolicy(serviceObj.key,policyAction);
	}catch(err){
		System.error("Error updating service policy "+serviceObj.key+" ("+err+")");
		Server.error("Error updating service policy "+serviceObj.key+" ("+err+")",serviceObj.key);
		
	}
}

==============AE===================
//getHostSystemServiceKeys(VC:HostSystem host, boolean logging)
var hostServiceSystem = host.configManager.serviceSystem;
hostServiceSystem.refreshServices();
var services = hostServiceSystem.serviceInfo.service;
var serviceKeys = new Array();
for each (svc in services){
	if(logging == true){
		System.log("Key: "+svc.key+" -- Label: "+svc.label+" -- Policy: "+svc.policy);
	}
	serviceKeys.push(svc.key);
}
return serviceKeys;
