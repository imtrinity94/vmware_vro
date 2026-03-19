/**
 * Prepare parameters
 *
 * @param {string} locationType
 * @param {VC:Datacenter} datacenter
 * @param {VC:HostFolder} hostFolder
 * @param {VC:ClusterComputeResource} clusterFolder
 * @return {AutoDeploy:AutoDeployItem} locationItem
 */
// prepare location parameter
locationItem = System.getModule("com.vmware.library.autodeploy.utils").getLocationItem(locationType,hostFolder,datacenter,clusterFolder);