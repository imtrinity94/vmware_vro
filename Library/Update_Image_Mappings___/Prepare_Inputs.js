/**
 * Simple task with custom script capability.
 *
 * @param {string} imageProfileName
 * @param {VRA:Host} vraHost
 * @return {Array/Properties} arrImageProperties
 * @return {string} latestFabricImageName
 */
Server.log("\""+System.currentWorkflowItem().getDisplayName()+"\"  script started");

var arrImageProperties = System.getModule("com.vmware.vra.extensibility.plugin.rest.iaas").getAllImageProperties(vraHost, imageProfileName, 180);
var keyword = "";

if(imageProfileName == "Unified-rhel8"){
    keyword = "SPGI-RHEL8";
    latestFabricImageName = System.getModule("com.mayank.actions").getLatestImageFromContentLibraryBasedOnName_RHEL(vraHost, keyword);
}
if(imageProfileName == "Unified-rhel9"){
    keyword = "SPGI-RHEL9";
    latestFabricImageName = System.getModule("com.mayank.actions").getLatestImageFromContentLibraryBasedOnName_RHEL(vraHost, keyword);
}
if(imageProfileName == "Unified-wk19std"){
    keyword = "SPGI.W2K19.";
    latestFabricImageName = System.getModule("com.mayank.actions").getLatestImageFromContentLibraryBasedOnName(vraHost, keyword);
}
if(imageProfileName == "Unified-wk22std"){
    keyword = "SPGI.W2K22.";
    latestFabricImageName = System.getModule("com.mayank.actions").getLatestImageFromContentLibraryBasedOnName(vraHost, keyword);
}

Server.log("\""+System.currentWorkflowItem().getDisplayName()+"\"  script completed");