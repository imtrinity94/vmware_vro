/**
 * Disable encrpytion on cluster
 *
 * @param {VC:ClusterComputeResource} cluster
 * @return {VC:Task} task
 */
var isEnabled = System.getModule("com.vmware.library.vsan.cluster.configuration").isVsanEnabledCluster(cluster);
if (!isEnabled) {
	System.log("This cluster is already vSAN disabled");
} else {
	var vsanConnection = System.getModule("com.vmware.library.vsan").getVsanConnectionFromSdkConnection(cluster.sdkConnection);
	if (vsanConnection == null) {
		throw "VsanConnectionError: Could not find vSAN connection for SDK connection [" + cluster.sdkConnection.name + "]";
	}
	var clusterConfigSystem = vsanConnection.vsanVcClusterConfigSystem;
	var clusterMoRef = new VsanManagedObjectReference(cluster.moref.type, cluster.moref.value);
	var vsanConfigInfo = clusterConfigSystem.vsanClusterGetConfig(clusterMoRef);
	var dataEncryptionConfig = vsanConfigInfo.dataEncryptionConfig;
	System.debug(dataEncryptionConfig);
	if (dataEncryptionConfig == null || !dataEncryptionConfig.encryptionEnabled) {
	throw "Data encryption is not enabled for cluster " + cluster.sdkConnection.name;
	}
	var configSpec = new VsanVimVsanReconfigSpec();
	configSpec.modify = true;
	configSpec.dataEncryptionConfig = new VsanVsanDataEncryptionConfig();
	configSpec.dataEncryptionConfig.encryptionEnabled = false;
	System.debug("Enable encryption on cluster: " + cluster.name);
	var vsanTask = clusterConfigSystem.vsanClusterReconfig(clusterMoRef, configSpec);
	task = System.getModule("com.vmware.library.vsan").getVcTaskById(cluster.sdkConnection, vsanTask.value);
}