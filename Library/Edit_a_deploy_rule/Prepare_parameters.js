/**
 * Prepare parameters
 *
 * @param {VC:HostFolder} hostFolder
 * @param {VC:Datacenter} datacenter
 * @param {VC:ClusterComputeResource} clusterFolder
 * @param {string} locationType
 * @param {AutoDeploy:DeployRule} rule
 * @return {AutoDeploy:AutoDeployItem} locationItem
 */
// prepare location parameter
locationItem = System.getModule("com.vmware.library.autodeploy.utils").getLocationItem(locationType,hostFolder,datacenter,clusterFolder);
