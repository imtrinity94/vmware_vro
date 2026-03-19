/**
 * Turn off DRS on cluster
 *
 * @param {VC:ClusterComputeResource} cluster
 * @return {VC:Task} task
 */
isEnabled = System.getModule("com.vmware.library.vc.cluster").drsEnabledCluster(cluster);
if (isEnabled) {
	var clusterConfigSpec = new VcClusterConfigSpecEx();
	clusterConfigSpec.drsConfig = new VcClusterDrsConfigInfo();
	clusterConfigSpec.drsConfig.enabled = false;

	System.log("Turning off DRS for: " + cluster.name);

	task = cluster.reconfigureComputeResource_Task(clusterConfigSpec, true);
}
else {
	System.log("This cluster is not DRS enabled");
}
