/**
 * Get Properties
 *
 * @param {CS:VCenterResource} selectedvCenter
 * @param {CS:NetworkResource} selectedNetwork
 * @param {string} selectedView
 * @param {CS:ClusterResource} selectedCluster
 * @param {CS:ProtectionJobNameResource} selectedProtectionJob
 * @param {CS:SnapshotVersion} selectedSnapshot
 * @param {CS:ResourcePoolResource} selectedResourcePool
 * @param {CS:DataCenterResource} selectedDatacenter
 * @param {CS:VirtualMachine} cohesityVirtualMachine
 * @param {VC:VirtualMachine} vcVM - [object Object]
 * @return {number} vCenterId - [object Object]
 * @return {number} dataCenterId - [object Object]
 * @return {number} networkId - [object Object]
 * @return {number} protectionJobId - [object Object]
 * @return {number} jobRunId - [object Object]
 * @return {string} vmName - [object Object]
 * @return {number} resourcePoolId - [object Object]
 * @return {number} protectionSourceId - [object Object]
 * @return {number} clusterId - [object Object]
 * @return {number} clusterIncarnationId - [object Object]
 * @return {number} startedTimeUsecs - [object Object]
 */
if (!vcVM && !cohesityVirtualMachine) {
	throw "[Invalid Input] VM instance is required.";
}
try {
    var vmName = cohesityVirtualMachine ? cohesityVirtualMachine.name : vcVM.displayName;
    var vCenterId = selectedvCenter.id;
    var dataCenterId = selectedDatacenter.id;

    if (selectedNetwork) {
        var networkId = selectedNetwork.id;
        System.log("The networkId is " + networkId);
    }

    var protectionJobId = selectedProtectionJob.id;
    var jobRunId = selectedSnapshot.jobRunId;

    // Start time usec.
    var startedTimeUsecs = selectedSnapshot.startedTimeUsecs;
    var clusterId = selectedProtectionJob.jobUid.clusterId;
    var clusterIncarnationId = selectedProtectionJob.jobUid.clusterIncarnationId;
    var resourcePoolId = selectedResourcePool.id;

    var protectionSourceId = selectedProtectionJob.objectId;

    // Debug
    System.log("**********");
    System.log("Clone machine place holderfor VM " + vmName);
    System.log("The vCenterId is " + vCenterId);
    System.log("The dataCenterId is " + dataCenterId);
    System.log("The resourcePoolId is " + resourcePoolId);
    System.log("clusterId is " + clusterId);
    System.log("The jobRunId is " + jobRunId);
    System.log("The protectionJobId is " + protectionJobId);
    System.log("cluseterIncarnationId is " + clusterIncarnationId);
    System.log("startedTimeUsecs is " + startedTimeUsecs);
    System.log("**********");


} catch (err) {
    throw "[Input Error] Something went wrong while fetching properties. " + err;
}