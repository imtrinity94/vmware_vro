/**
 * Create group
 *
 * @param {VC:HostSystem} host
 * @param {Array/string} cacheDiskNames
 * @param {Array/string} capacityDiskNames
 * @param {string} creationType
 * @return {VC:Task} task
 */
var vsanConnection = System.getModule("com.vmware.library.vsan").getVsanConnectionFromSdkConnection(host.sdkConnection);
if (vsanConnection == null) {
   throw "VsanConnectionError: Could not find vSAN connection for SDK connection [" + host.sdkConnection.name + "]";
}

var cacheDisks = System.getModule("com.vmware.library.vc.storage.vsan").findVsanDisks(host, cacheDiskNames);
var capacityDisks = System.getModule("com.vmware.library.vc.storage.vsan").findVsanDisks(host, capacityDiskNames);

var mappingCreationSpec = new VsanVimVsanHostDiskMappingCreationSpec();
mappingCreationSpec.host = new VsanManagedObjectReference(host.moref.type, host.moref.value);
mappingCreationSpec.cacheDisks = cacheDisks.map(convertToVsanHostScsiDisk);
mappingCreationSpec.capacityDisks = capacityDisks.map(convertToVsanHostScsiDisk);
mappingCreationSpec.creationType = getCreationType(creationType);

var diskManagementSystem = vsanConnection.vsanVcDiskManagementSystem;
var vsanTask = diskManagementSystem.initializeDiskMappings(mappingCreationSpec);
task = System.getModule("com.vmware.library.vsan").getVcTaskById(host.sdkConnection, vsanTask.value);

function convertToVsanHostScsiDisk(hostScsiDisk) {
   var result = new VsanHostScsiDisk();

   // HostScsiDisk prperties
   result.capacity = new VsanHostDiskDimensionsLba();
   result.capacity.block = hostScsiDisk.capacity.block;
   result.capacity.blockSize = hostScsiDisk.capacity.blockSize;
   result.devicePath = hostScsiDisk.devicePath;
   result.ssd = hostScsiDisk.ssd;

   // ScsiLun properties
   result.canonicalName = hostScsiDisk.canonicalName;
   result.lunType = hostScsiDisk.lunType;
   result.operationalState = hostScsiDisk.operationalState;
   result.uuid = hostScsiDisk.uuid;

   // HostDevice properties
   result.deviceName = hostScsiDisk.deviceName;
   result.deviceType = hostScsiDisk.deviceType;
   
   return result;
}

function getCreationType (creationType) {
   if (creationType === "Hybrid") {
      return "hybrid";
   } else if (creationType === "All Flash") {
      return "allFlash";
   } else if (creationType === "VMFS") {
      return "vmfs";
   } else {
      return "DiskMappingCreationType_Unknown";
   }
}
