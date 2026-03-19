/**
 * Get VM Cluster
 *
 * @param {VC:VirtualMachine} VM
 * @param {PS:Volume} volumeCreated
 * @return {VC:ClusterComputeResource} cluster
 * @return {PS:Volume} faVolume - [object Object]
 */
var parent = VM.resourcePool;

while ( ! (parent instanceof VcClusterComputeResource) && ! (parent instanceof VcComputeResource)) {
	parent = parent.parent;
}

clusterName = parent.name;
if (parent instanceof VcClusterComputeResource) {
	clusterId = parent.sdkId;
	cluster = parent;
}

faVolume = volumeCreated;