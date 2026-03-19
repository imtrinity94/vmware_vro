/**
 * Configure vSAN
 *
 * @param {VC:ClusterComputeResource} cluster
 * @param {boolean} largeScaleClusterSupport
 * @param {boolean} dedupAndCompression
 * @param {boolean} enableVsanESA
 * @param {boolean} enableVsanMAX
 * @return {VC:Task} task
 */
var isEnabled = System.getModule("com.vmware.library.vsan.cluster.configuration").isVsanEnabledCluster(cluster);
if (!isEnabled) {
   throw "VsanConfigError: This cluster is not vSAN enabled";
}

var vsanConnection = System.getModule("com.vmware.library.vsan").getVsanConnectionFromSdkConnection(cluster.sdkConnection);
if (vsanConnection == null) {
   throw "VsanConnectionError: Could not find vSAN connection for SDK connection [" + cluster.sdkConnection.name + "]";
}

var clusterConfigSystem = vsanConnection.vsanVcClusterConfigSystem;
var clusterMoRef = new VsanManagedObjectReference(cluster.moref.type, cluster.moref.value);
var configSpec = new VsanVimVsanReconfigSpec();
configSpec.modify = true;

configSpec.extendedConfig = new VsanVsanExtendedConfig();
configSpec.extendedConfig.largeScaleClusterSupport = largeScaleClusterSupport;
configSpec.vsanClusterConfig = new VsanVsanClusterConfigInfo();
var vsanEsasupported = System.getModule("com.vmware.library.vsan").isVsanEsaSupported(cluster);
if (vsanEsasupported && enableVsanESA) {
	configSpec.vsanClusterConfig.enabled = true;
	configSpec.vsanClusterConfig.vsanEsaEnabled = true;

}
var vsan80u2supported = System.getModule("com.vmware.library.vsan").isVsan80u2Supported(cluster);
if (vsan80u2supported && enableVsanMAX) {
	configSpec.mode="Mode_Storage";

}

var vsanTask = clusterConfigSystem.vsanClusterReconfig(clusterMoRef, configSpec);
task = System.getModule("com.vmware.library.vsan").getVcTaskById(cluster.sdkConnection, vsanTask.value);