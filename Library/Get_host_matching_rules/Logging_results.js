/**
 * Logging results
 *
 * @param {Array/AutoDeploy:DeployRule} actionResult
 * @return {Array/AutoDeploy:DeployRule} actionResult
 */
if (actionResult != null) {
    System.log("Retrieved " + actionResult.length + " rules:\n");
    for(var i in actionResult) {
        System.log("Rule details:");
        System.log("Name: " + actionResult[i].name);
        System.log("Pxe profile name: " + actionResult[i].pxeProfileName);
        System.log("Pxe profile packages: " + actionResult[i].pxeProfilePackages);
        System.log("Location: " + actionResult[i].location);
        System.log("Host profile: " + actionResult[i].hostProfile);
        System.log("Pattern: " + actionResult[i].pattern);
        System.log("---\n");
    }
}