/**
 * Retrieves all hidden rules from a specific Auto Deploy host.
 *
 * @param {AutoDeploy:AutoDeploy} adHost - [object Object]
 * @return {Array/AutoDeploy:DeployRule} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.autodeploy").getHiddenRules(adHost) ;