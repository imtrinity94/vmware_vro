/**
 * Verify connection with Target FA for Target Cluster
 *
 * @param {VC:ClusterComputeResource} targetCluster
 * @param {PS:FlashArrayConnection} targetFAConnection
 * @return {PS:HostGroup} targetHostGroup
 */
targetHostGroup = System.getModule("com.purestorage.flasharray.vmware.vcenter").correlateClusterToHostGroup(targetCluster,targetFAConnection);
if(!targetHostGroup){
	var errorMessage="Cluster Compute Resource does not have any corresponding HostGroup in Pure Storage FlashArray.";
	System.error(errorMessage);
	throw error;
}
