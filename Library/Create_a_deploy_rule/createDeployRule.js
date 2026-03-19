/**
 * Creates a new deploy rule.
 *
 * @param {AutoDeploy:AutoDeploy} adHost - [object Object]
 * @param {string} ruleName - [object Object]
 * @param {AutoDeploy:SoftwareImageProfile} imageProfile - [object Object]
 * @param {AutoDeploy:ADHostProfile} hostProfile - [object Object]
 * @param {AutoDeploy:AutoDeployItem} locationObj - [object Object]
 * @param {string} pattern - [object Object]
 * @return {AutoDeploy:DeployRule} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.autodeploy").createDeployRule(adHost,ruleName,imageProfile,hostProfile,locationObj,pattern) ;