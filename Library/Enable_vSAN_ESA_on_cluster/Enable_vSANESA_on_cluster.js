/**
 * Enable vSANESA on cluster
 *
 * @param {VC:ClusterComputeResource} cluster
 * @return {VC:Task} task
 */
var vsanConnection = System.getModule("com.vmware.library.vsan").getVsanConnectionFromSdkConnection(cluster.sdkConnection);
if (vsanConnection == null) {
    throw "VsanConnectionError: Could not find vSAN connection for SDK connection [" + cluster.sdkConnection.name + "]";
}
var vsanEsasupported = System.getModule("com.vmware.library.vsan").isVsanEsaSupported(cluster);
if (!vsanEsasupported) {
    throw "The cluster is not vSAN ESA supported, you may need to use a VC version 8.0 or above"
}
var vsanEsaEnabled = System.getModule("com.vmware.library.vsan").isVsanEsa(cluster);
if (vsanEsaEnabled) {
	System.log("vSAN ESA is enabled already");
	task = null;
} else {
	var clusterConfigSystem = vsanConnection.vsanVcClusterConfigSystem;
	var clusterMoRef = new VsanManagedObjectReference(cluster.moref.type, cluster.moref.value);
	var configSpec = new VsanVimVsanReconfigSpec();
	configSpec.modify = true;
	configSpec.vsanClusterConfig = new VsanVsanClusterConfigInfo();
	configSpec.vsanClusterConfig.enabled = true;
	configSpec.vsanClusterConfig.vsanEsaEnabled = true;

	System.log("Enabling vSAN on cluster: " + cluster.name);
	var vsanTask = clusterConfigSystem.vsanClusterReconfig(clusterMoRef, configSpec);
	task = System.getModule("com.vmware.library.vsan").getVcTaskById(cluster.sdkConnection, vsanTask.value);
}