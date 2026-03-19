/**
 * Get Compute Resouce
 *
 * @param {VC:VirtualMachine} vm
 * @return {string} clusterName
 * @return {string} clusterId
 * @return {string} computeResourceId
 * @return {VC:ClusterComputeResource} cluster
 * @return {VC:ComputeResource} computeResource
 */
var parent = vm.resourcePool;

while ( ! (parent instanceof VcClusterComputeResource) && ! (parent instanceof VcComputeResource)) {
	parent = parent.parent;
}

clusterName = parent.name;
if (parent instanceof VcClusterComputeResource) {
	clusterId = parent.sdkId;
	cluster = parent;
}
else {
	computeResourceId = parent.sdkId;
	computeResource = parent;
}