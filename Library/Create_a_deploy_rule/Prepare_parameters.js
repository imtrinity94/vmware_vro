/**
 * Prepare parameters
 *
 * @param {AutoDeploy:AutoDeploy} adHost
 * @param {string} ruleName
 * @param {AutoDeploy:SoftwareImageProfile} imageProfile
 * @param {AutoDeploy:ADHostProfile} hostProfile
 * @param {string} locationType
 * @param {VC:HostFolder} hostFolder
 * @param {string} pattern
 * @param {VC:Datacenter} datacenter
 * @param {VC:ClusterComputeResource} clusterFolder
 * @return {AutoDeploy:AutoDeployItem} locationObj
 */
locationObj = System.getModule("com.vmware.library.autodeploy.utils").getLocationItem(locationType,hostFolder,datacenter,clusterFolder);
