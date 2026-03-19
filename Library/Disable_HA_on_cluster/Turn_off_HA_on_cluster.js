/**
 * Turn off HA on cluster
 *
 * @param {VC:ClusterComputeResource} cluster
 * @return {VC:Task} task
 */
isEnabled = System.getModule("com.vmware.library.vc.cluster").haEnabledCluster(cluster);
if (isEnabled) {
	var clusterConfigSpec = new VcClusterConfigSpecEx();
	clusterConfigSpec.dasConfig = new VcClusterDasConfigInfo();
	clusterConfigSpec.dasConfig.enabled = false;

	System.log("Turning off HA for: " + cluster.name);

	task = cluster.reconfigureComputeResource_Task(clusterConfigSpec, true);
}
else {
	System.log("This cluster is not HA enabled");
}
