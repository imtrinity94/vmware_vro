/**
 * The disk should be vSAN ESA eligible and is already claimed in the storage pool.
 *
 * @param {VC:ClusterComputeResource} cluster
 * @param {Array/string} diskUuids
 * @param {string} vSANDecommissionMode
 * @param {string} purpose
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
var clusterConfigSystem = vsanConnection.vsanVcClusterConfigSystem;
var clusterMoRef = new VsanManagedObjectReference(cluster.moref.type, cluster.moref.value);
var vsanConfigInfo = clusterConfigSystem.vsanClusterGetConfig(clusterMoRef);
System.debug("vsanConfigInfo" + vsanConfigInfo);
if (!vsanConfigInfo.vsanEsaEnabled) {
	throw "This is NOT a vSAN ESA cluster. The cluster is not allowed to add storage pool disks";
}
var clusterMoRef = new VsanManagedObjectReference(cluster.moref.type, cluster.moref.value);
var spec = new VsanVsanDeleteStoragePoolDiskSpec();
//var decommission = new VsanVsanHostDecommissionMode(vSANDecommissionMode);
//var decommission = new VsanVsanHostDecommissionMode(objectAction = 0);
var decommission = new VsanVsanHostDecommissionMode(objectAction = vSANDecommissionMode);
var hostmaintenanaceSpec = new VsanHostMaintenanceSpec();
hostmaintenanaceSpec.purpose = purpose;
hostmaintenanaceSpec.vsanMode = decommission;

spec.diskUuids = diskUuids;
spec.maintenanceSpec = hostmaintenanaceSpec;
var diskManagementSystem = vsanConnection.vsanVcDiskManagementSystem;
System.debug(spec);
var vsanTask = diskManagementSystem.vsanDeleteStoragePoolDisk(clusterMoRef, spec);
task = System.getModule("com.vmware.library.vsan").getVcTaskById(cluster.sdkConnection, vsanTask.value);


