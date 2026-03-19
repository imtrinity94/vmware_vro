/**
 * Retrieves the answer file associated with a specific ESXi host.
 *
 * @param {AutoDeploy:AutoDeploy} adHost - [object Object]
 * @param {AutoDeploy:AutoDeployItem} esxHost - [object Object]
 * @return {string} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.autodeploy.answerfiles").getAnswerFileStatus(adHost,esxHost) ;