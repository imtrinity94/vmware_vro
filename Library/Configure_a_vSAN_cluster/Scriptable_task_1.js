/**
 * Scriptable task
 *
 * @param {boolean} autoClaimDisk
 * @param {VC:ClusterComputeResource} cluster
 * @return {VC:Task} task
 */
var vsanEsasupported = System.getModule("com.vmware.library.vsan").isVsanEsaSupported(cluster);
if (vsanEsasupported && autoClaimDisk) {
var vsanConnection = System.getModule("com.vmware.library.vsan").getVsanConnectionFromSdkConnection(cluster.sdkConnection);


var clusterConfigSystem = vsanConnection.vsanVcClusterConfigSystem;
var clusterMoRef = new VsanManagedObjectReference(cluster.moref.type, cluster.moref.value);
var configSpec = new VsanVimVsanReconfigSpec();
configSpec.modify = true;

configSpec.vsanEsaConfig = new VsanVsanEsaConfig();
configSpec.vsanEsaConfig.hclDiskClaimEnabled = autoClaimDisk;

var vsanTask = clusterConfigSystem.vsanClusterReconfig(clusterMoRef, configSpec);
task = System.getModule("com.vmware.library.vsan").getVcTaskById(cluster.sdkConnection, vsanTask.value);}
else {task = null;}