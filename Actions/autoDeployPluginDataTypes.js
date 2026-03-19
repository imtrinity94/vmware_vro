/**
 * @description Explores AutoDeploy plugin data types and provides code snippets for 
 *              managing AutoDeploy configurations, depots, and rules.
 * @note JSDoc generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @returns {void}
 */

// Example 1: Listing ADHostProfile objects
System.log("ADHostProfile---------------------------");
var adHostProfilesList = Server.findAllForType("AutoDeploy:ADHostProfile");
var i;
for (i = 0; i < adHostProfilesList.length; i++) {
    System.log(adHostProfilesList[i].name);
}

// Example 2: Listing AutoDeploy objects
System.log("AutoDeploy----------------------------");
var autoDeploysList = Server.findAllForType("AutoDeploy:AutoDeploy");
for (i = 0; i < autoDeploysList.length; i++) {
    System.log(autoDeploysList[i].name);
}

// Example 3: Listing DeployRule objects
System.log("DeployRule----------------------------------");
var deployRulesList = Server.findAllForType("AutoDeploy:DeployRule");
for (i = 0; i < deployRulesList.length; i++) {
    System.log(deployRulesList[i].pxeProfileName + " - " + deployRulesList[i].name);
}

// Example 4: Listing SoftwareChannel objects
System.log("SoftwareChannel-------------------------------");
var softwareChannelsList = Server.findAllForType("AutoDeploy:SoftwareChannel");
for (i = 0; i < softwareChannelsList.length; i++) {
    System.log(softwareChannelsList[i].name);
}

// Example 5: Listing SoftwareDepot objects
System.log("SoftwareDepot-----------------------------");
var softwareDepotsList = Server.findAllForType("AutoDeploy:SoftwareDepot");
for (i = 0; i < softwareDepotsList.length; i++) {
    System.log(softwareDepotsList[i].depotName);
}

// Example 6: Listing SoftwareImageProfile objects
System.log("SoftwareImageProfile-----------------------------");
var imageProfilesList = Server.findAllForType("AutoDeploy:SoftwareImageProfile");
for (i = 0; i < imageProfilesList.length; i++) {
    System.log(imageProfilesList[i].name);
}

// Example 7: Listing SoftwareVendor objects
System.log("SoftwareVendor-----------------------------");
var softwareVendorsList = Server.findAllForType("AutoDeploy:SoftwareVendor");
for (i = 0; i < softwareVendorsList.length; i++) {
    System.log(softwareVendorsList[i].name);
}

return null;
