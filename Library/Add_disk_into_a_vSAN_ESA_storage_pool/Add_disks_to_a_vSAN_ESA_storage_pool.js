/**
 * The disk should be vSAN ESA eligible
 *
 * @param {VC:HostSystem} host
 * @param {Array/string} diskCanonicalNames
 * @param {string} vSANStoragepoolDiskType
 * @return {VC:Task} task
 */
var vsanConnection = System.getModule("com.vmware.library.vsan").getVsanConnectionFromSdkConnection(host.sdkConnection);
if (vsanConnection == null) {
   throw "VsanConnectionError: Could not find vSAN connection for SDK connection [" + host.sdkConnection.name + "]";
}
// check vSAN ESA compatible
var vSANESACompatible = true;
if (host != null && host.sdkConnection != null && host.sdkConnection.about != null) {
	var api = host.sdkConnection.about.apiVersion
	if (api != null && api.length >= 1) {
		if  (parseFloat(api[0]) < 8) {vSANESACompatible = false;}
	}
} else {vSANESACompatible = false;}
if (!vSANESACompatible) {
	throw "The cluster is not vSAN ESA supported, you may need to use a VC version 8.0 or above"
}
var storagePoolDisks = [];
System.debug("diskname" + diskCanonicalNames);
System.debug("disk length" + diskCanonicalNames.length);
for (var i = 0; i < diskCanonicalNames.length; i++) {
	var curDisk = new VsanVsanStoragePoolDisk();
    curDisk.DiskName = diskCanonicalNames[i];
    curDisk.DiskType = vSANStoragepoolDiskType;
    storagePoolDisks[i] = curDisk;
	System.debug("curDisk" + curDisk);
}
var spec = new VsanVsanAddStoragePoolDiskSpec();
spec.host = new VsanManagedObjectReference(host.moref.type, host.moref.value);
spec.disks = storagePoolDisks;
System.debug("spec" + spec);
var specs = [];
specs[0] = spec;
var diskManagementSystem = vsanConnection.vsanVcDiskManagementSystem;
var vsanTask = diskManagementSystem.vsanAddStoragePoolDisk(specs);
task = System.getModule("com.vmware.library.vsan").getVcTaskById(host.sdkConnection, vsanTask.value);


