/**
 * Turn on DRS on cluster
 *
 * @param {VC:ClusterComputeResource} cluster
 * @return {VC:Task} task
 */
isEnabled = System.getModule("com.vmware.library.vc.cluster").drsEnabledCluster(cluster);
if (isEnabled) {

	System.log("This cluster is already DRS enabled");
}
else {
	var clusterConfigSpec = new VcClusterConfigSpecEx();
	clusterConfigSpec.drsConfig = new VcClusterDrsConfigInfo();
	clusterConfigSpec.drsConfig.enabled = true;

	System.log("Turning on DRS for: " + cluster.name);

	task = cluster.reconfigureComputeResource_Task(clusterConfigSpec, true);
}

