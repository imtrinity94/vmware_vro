/**
 * Gets ESXi host attributes which are used when the Auto Deploy server evaluates the rules.
 *
 * @param {AutoDeploy:AutoDeploy} adHost - [object Object]
 * @param {AutoDeploy:AutoDeployItem} esxHost - [object Object]
 * @return {Properties} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.autodeploy").getHostAttributes(adHost,esxHost) ;