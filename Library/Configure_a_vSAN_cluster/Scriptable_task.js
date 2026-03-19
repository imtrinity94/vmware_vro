/**
 * Scriptable task
 *
 * @param {boolean} enableEncryption
 * @param {string} kmsProviderId
 * @param {VC:ClusterComputeResource} cluster
 * @return {VC:Task} task
 */
var vsanConnection = System.getModule("com.vmware.library.vsan").getVsanConnectionFromSdkConnection(cluster.sdkConnection);

var clusterConfigSystem = vsanConnection.vsanVcClusterConfigSystem;
var clusterMoRef = new VsanManagedObjectReference(cluster.moref.type, cluster.moref.value);
var configSpecEncryption = new VsanVimVsanReconfigSpec();
if (enableEncryption) {
configSpecEncryption.modify = true;
configSpecEncryption.dataEncryptionConfig = new VsanVsanDataEncryptionConfig();
configSpecEncryption.dataEncryptionConfig.encryptionEnabled = true;
var vsanKeyProvideId = new VsanKeyProviderId(kmsProviderId);
configSpecEncryption.dataEncryptionConfig.kmsProviderId = vsanKeyProvideId;
}
var vsanTask = clusterConfigSystem.vsanClusterReconfig(clusterMoRef, configSpecEncryption);

task = System.getModule("com.vmware.library.vsan").getVcTaskById(cluster.sdkConnection, vsanTask.value);