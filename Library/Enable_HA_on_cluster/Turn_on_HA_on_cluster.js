/**
 * Turn on HA on cluster
 *
 * @param {VC:ClusterComputeResource} cluster
 * @return {VC:Task} task
 */
isEnabled = System.getModule("com.vmware.library.vc.cluster").haEnabledCluster(cluster);
if (isEnabled) {

	System.log("This cluster is already HA enabled");
}
else {
	var clusterConfigSpec = new VcClusterConfigSpecEx();
	clusterConfigSpec.dasConfig = new VcClusterDasConfigInfo();
	clusterConfigSpec.dasConfig.enabled = true;

	System.log("Turning on HA for: " + cluster.name);

	task = cluster.reconfigureComputeResource_Task(clusterConfigSpec, true);
}

