/**
 * Disable vCloud Distributed Storage
 *
 * @param {VC:ClusterComputeResource} cluster
 * @return {VC:Task} task
 */
isEnabled = System.getModule("com.vmware.library.vc.cluster").vsanEnabledCluster(cluster);
if (isEnabled) {
	var clusterConfigSpec = new VcClusterConfigSpecEx();
	clusterConfigSpec.vsanConfig = new VcVsanClusterConfigInfo();
	clusterConfigSpec.vsanConfig.enabled = false;
	if (cluster.configurationEx != null 
	   && cluster.configurationEx.vsanConfigInfo != null
	   && cluster.configurationEx.vsanConfigInfo.defaultConfig != null
	   ) {
	   clusterConfigSpec.vsanConfig.defaultConfig = new VcVsanClusterConfigInfoHostDefaultInfo();
	   clusterConfigSpec.vsanConfig.defaultConfig.autoClaimStorage = 
	       cluster.configurationEx.vsanConfigInfo.defaultConfig.autoClaimStorage;
	}
	System.log("Turning off vCloud Distributed Storage for " + cluster.name);

	task = cluster.reconfigureComputeResource_Task(clusterConfigSpec, true);
}
else {
	System.log("vCloud Distributed Storage is already disabled for " + cluster.name);
}