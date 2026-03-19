/**
 * getVMCluster
 *
 * @param {VC:VirtualMachine} targetVM - [object Object]
 * @param {PS:Volume} rdmVolume
 * @return {VC:ClusterComputeResource} targetVMCluster
 */
//Find the VCCluster corresponding to input VM
var parent = targetVM.resourcePool;

while ( ! (parent instanceof VcClusterComputeResource) && ! (parent instanceof VcComputeResource)) {
	parent = parent.parent;
}

clusterName = parent.name;
if (parent instanceof VcClusterComputeResource) {
	clusterId = parent.sdkId;
	targetVMCluster = parent;
}

//faVolume = volumeCreated;