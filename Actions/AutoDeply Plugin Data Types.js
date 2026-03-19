/**
 * Explores AutoDeploy plugin data types and provides code snippets for 
 * managing AutoDeploy configurations, depots, and rules.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @returns {void}
 */

// Example 1: Listing ADHostProfile objects
System.log("ADHostProfile---------------------------");
var adHostProfiles = Server.findAllForType("AutoDeploy:ADHostProfile");
for (var i = 0; i < adHostProfiles.length; i++) {
    System.log(adHostProfiles[i].name);
}

// Example 2: Listing AutoDeploy objects
System.log("AutoDeploy----------------------------");
var autoDeploys = Server.findAllForType("AutoDeploy:AutoDeploy");
for (var i = 0; i < autoDeploys.length; i++) {
    System.log(autoDeploys[i].name);
}

// Example 3: Listing DeployRule objects
System.log("DeployRule----------------------------------");
var deployRules = Server.findAllForType("AutoDeploy:DeployRule");
for (var i = 0; i < deployRules.length; i++) {
    System.log(deployRules[i].pxeProfileName + " - " + deployRules[i].name);
}

// Example 4: Listing SoftwareChannel objects
System.log("SoftwareChannel-------------------------------");
var softwareChannels = Server.findAllForType("AutoDeploy:SoftwareChannel");
for (var i = 0; i < softwareChannels.length; i++) {
    System.log(softwareChannels[i].name);
}

// Example 5: Listing SoftwareDepot objects
System.log("SoftwareDepot-----------------------------");
var softwareDepots = Server.findAllForType("AutoDeploy:SoftwareDepot");
for (var i = 0; i < softwareDepots.length; i++) {
    System.log(softwareDepots[i].depotName);
}

// Example 6: Listing SoftwareImageProfile objects
System.log("SoftwareImageProfile-----------------------------");
var imageProfiles = Server.findAllForType("AutoDeploy:SoftwareImageProfile");
for (var i = 0; i < imageProfiles.length; i++) {
    System.log(imageProfiles[i].name);
}

// Example 7: Listing SoftwareVendor objects
System.log("SoftwareVendor-----------------------------");
var softwareVendors = Server.findAllForType("AutoDeploy:SoftwareVendor");
for (var i = 0; i < softwareVendors.length; i++) {
    System.log(softwareVendors[i].name);
}

/* 
 * -----------------------------------------------------------------------------------------------------------------------------------------------------------
 * SNIPPETS FOR REFERENCE (Commented out to avoid accidental execution)
 * -----------------------------------------------------------------------------------------------------------------------------------------------------------
 */

/*
// Reload configuration
// autoDeployManager.reloadConfiguration();

// Clear answer file and get status
// esxHostItem = new AutoDeployItem(esxHost._getRef().type, esxHost._getRef().value);
// adHost.clearAnswerFile(esxHostItem);
// adHost.getAnswerFileStatus(esxHostItem);
// adHost.getXmlAnswerFile(esxHostItem);

// Find and add AutoDeploy hosts
// autoDeployManager.findAutoDeployHostUri(vcHost.name);
// autoDeployManager.addAutoDeployHost(vcHost.name);
// autoDeployManager.removeAutoDeployHost(adHost);

// Manage Software Depots
// sDepo = autoDeployManager.addSoftwareDepot(depotName, depotURL);
// autoDeployManager.removeSoftwareDepot(depot);
// autoDeployManager.updateSoftwareDepot(depot, depotName, depotURL);

// List deploy options
// var deployOptions = adHost.getDeployOptions();
// if (deployOptions != null) {
//     for(var i in deployOptions.keys) {
//         var key = deployOptions.keys[i];
//         System.log("key: " + key + " value: " + deployOptions.get(key));
//     }
// }

// Set deploy option
// adHost.setDeployOption(key, value);

// Apply Image Profile to multiple hosts
// adHost.applyImageProfile(esxHosts, imageProfile);

// Activate Deploy Rule
// autoDeployManager.getAutoDeploy(deployRule.getHostUri());
// adHost.activateDeployRule(deployRule, position);

// Working Set management
// adHost.activateWorkingSet();
// adHost.addToWorkingSet(deployRule, position);

// Compliance and Attributes
// var hiddenRules = adHost.getHiddenRules();
// adHost.repairRuleSetCompliance(esxHost);
// var attributes = adHost.retrieveHostAttributes(esxHost);
// for(var i in attributes.keys) {
//     System.log("attribute: " + attributes.keys[i] + " value: " + attributes.get(attributes.keys[i]));
// }
*/
