/**
 * getHostMatchingRules
 *
 * @param {AutoDeploy:AutoDeploy} adHost
 * @param {AutoDeploy:AutoDeployItem} esxHost
 * @param {string} ruleSetType
 * @return {Array/AutoDeploy:DeployRule} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.autodeploy").getHostMatchingRules(adHost,esxHost,ruleSetType) ;