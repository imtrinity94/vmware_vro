/**
 * Retrieves all rules which apply to a host.
 *
 * @param {AutoDeploy:AutoDeploy} adHost
 * @param {AutoDeploy:AutoDeployItem} esxHost
 * @param {string} ruleSetType
 * @return {Array/AutoDeploy:CheckItemResult} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.autodeploy").testRuleSetCompliance(adHost,esxHost,ruleSetType) ;