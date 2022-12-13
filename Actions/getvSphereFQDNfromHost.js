//If you want to get vCenter's FQDN or instance name, you can use the following code:
// host of type VC:HostSystem
var sdkConnection = host.sdkConnection;  
var optionManager = sdkConnection.optionManager;  
var vCenterInstanceName = optionManager.queryOptions("VirtualCenter.InstanceName").shift().value;  
var vCenterFqdn = optionManager.queryOptions("VirtualCenter.FQDN").shift().value;   
System.log("vCenter Instance Name: " + vCenterInstanceName);  
System.log("vCenter FQDN: " + vCenterFqdn); 
