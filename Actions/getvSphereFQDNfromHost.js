/**
 * Retrieves the vCenter Instance Name and FQDN for a given vCenter host.
 * Uses the OptionManager to query vCenter global settings.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {VC:HostSystem} host The vCenter host system object.
 * @returns {Properties} A properties object containing InstanceName and FQDN.
 */

var sdkConnection = host.sdkConnection;  
var optionManager = sdkConnection.optionManager;  

var instanceQueryResult = optionManager.queryOptions("VirtualCenter.InstanceName");
var fqdnQueryResult = optionManager.queryOptions("VirtualCenter.FQDN");

var vCenterInstanceName = (instanceQueryResult && instanceQueryResult.length > 0) ? instanceQueryResult.shift().value : "Unknown";
var vCenterFqdn = (fqdnQueryResult && fqdnQueryResult.length > 0) ? fqdnQueryResult.shift().value : "Unknown";

System.log("vCenter Instance Name: " + vCenterInstanceName);  
System.log("vCenter FQDN: " + vCenterFqdn);

var result = new Properties();
result.put("InstanceName", vCenterInstanceName);
result.put("FQDN", vCenterFqdn);

return result;
