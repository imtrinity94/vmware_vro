/**
 * Prepare results
 *
 * @param {Array/AutoDeploy:DeployRule} rulesResult
 * @return {Array/AutoDeploy:DeployRule} hiddenRules
 */
if (rulesResult != null) {
    System.log("Retrieved " + rulesResult.length + " rules:\n");
    for(var i = 0; i < rulesResult.length; i++) {
        System.log("Rule details:");
        System.log("Name: " + rulesResult[i].name);
        System.log("Pxe profile name: " + rulesResult[i].pxeProfileName);
        System.log("Pxe profile packages: " + rulesResult[i].pxeProfilePackages);
        System.log("Location: " + rulesResult[i].location);
        System.log("Host profile: " + rulesResult[i].hostProfile);
        System.log("Pattern: " + rulesResult[i].pattern);
        System.log("---\n");
    }
    hiddenRules = rulesResult;
}