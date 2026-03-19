/**
 * Prepare result
 *
 * @param {AutoDeploy:DeployRule} actionResult
 * @return {AutoDeploy:DeployRule} deployRule
 */
if (actionResult != null) {
    System.log("Created rule details:");
    System.log("Name: " + actionResult.name);
    System.log("Pxe profile name: " + actionResult.pxeProfileName);
    System.log("Pxe profile packages: " + actionResult.pxeProfilePackages);
    System.log("Location: " + actionResult.location);
    System.log("Host profile: " + actionResult.hostProfile);
    System.log("Pattern: " + actionResult.pattern);
    
    deployRule = actionResult;
} else {
    System.log("Create Deploy Rule action returned empty result: " + actionResult);
}