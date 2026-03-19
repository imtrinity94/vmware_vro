/**
 * Delete hidden rules
 *
 * @param {Array/AutoDeploy:DeployRule} hiddenRules
 */
if (hiddenRules != null) {
    for(var i = 0; i < hiddenRules.length; i++) {
        System.getModule("com.vmware.library.autodeploy").deleteDeployRule(hiddenRules[i]);
    }
    System.log("Successfully deleted all hidden rules!");
} else {
    System.log("No hidden rules found!");
}