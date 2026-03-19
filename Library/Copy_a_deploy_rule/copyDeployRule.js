/**
 * Updates a non-editable deploy rule on a specific Auto Deploy host.
 *
 * @param {AutoDeploy:DeployRule} rule - [object Object]
 * @param {string} ruleName - [object Object]
 * @param {boolean} changedPxeProfile - [object Object]
 * @param {AutoDeploy:SoftwareImageProfile} imageProfile - [object Object]
 * @param {boolean} changedHostProfile - [object Object]
 * @param {AutoDeploy:ADHostProfile} hostProfile - [object Object]
 * @param {boolean} changedLocation - [object Object]
 * @param {AutoDeploy:AutoDeployItem} locationItem - [object Object]
 * @param {string} pattern - [object Object]
 * @param {boolean} activate - [object Object]
 * @param {boolean} updateSets - [object Object]
 * @return {AutoDeploy:DeployRule} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.autodeploy").copyDeployRule(rule,ruleName,changedPxeProfile,imageProfile,changedHostProfile,hostProfile,changedLocation,locationItem,pattern,activate,updateSets) ;