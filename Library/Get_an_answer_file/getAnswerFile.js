/**
 * Retrieves an answer file associated with a specific ESXi host.
 *
 * @param {AutoDeploy:AutoDeploy} adHost
 * @param {AutoDeploy:AutoDeployItem} targetHost
 * @return {AutoDeploy:ADAnswerFile} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.autodeploy.answerfiles").getAnswerFile(adHost,targetHost) ;