/**
 * Enable encrpytion on cluster
 *
 * @param {VC:ClusterComputeResource} cluster
 * @param {string} kmsProviderId
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
	System.debug("vsanConfigInfo" + vsanConfigInfo);
	if (vsanConfigInfo.vsanEsaEnabled) {
		throw "This is a vSAN ESA cluster, encryption for vSAN ESA cluster is only allowed when enabling vSAN ESA along with" + cluster.sdkConnection.name + "]";
	}
	var configSpec = new VsanVimVsanReconfigSpec();
	configSpec.modify = true;
	configSpec.dataEncryptionConfig = new VsanVsanDataEncryptionConfig();
	configSpec.dataEncryptionConfig.encryptionEnabled = true;
	var vsanKeyProvideId = new VsanKeyProviderId(kmsProviderId);
	configSpec.dataEncryptionConfig.kmsProviderId = vsanKeyProvideId;

	System.debug("Encryption config" + configSpec.dataEncryptionConfig);
	var vsanTask = clusterConfigSystem.vsanClusterReconfig(clusterMoRef, configSpec);
	task = System.getModule("com.vmware.library.vsan").getVcTaskById(cluster.sdkConnection, vsanTask.value);
}