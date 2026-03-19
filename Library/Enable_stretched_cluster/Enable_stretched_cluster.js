/**
 * Enable stretched cluster
 *
 * @param {VC:ClusterComputeResource} cluster
 * @param {string} preferredFaultDomain
 * @param {VC:HostSystem} witnessHost
 * @param {string} ssdName
 * @param {Array/string} hddNames
 * @param {string} secondaryFaultDomain
 * @param {Array/string} disksClaimedFromWitnessHost
 * @param {boolean} claimDisk
 * @return {VC:Task} task
 */
var vsanConnection = System.getModule("com.vmware.library.vsan").getVsanConnectionFromSdkConnection(cluster.sdkConnection);
if (vsanConnection == null) {
   throw "VsanConnectionError: Could not find vSAN connection for SDK connection [" + cluster.sdkConnection.name + "]";
}

var stretchedClusterSystem = vsanConnection.vsanVcStretchedClusterSystem;
var clusterMoRef = new VsanManagedObjectReference(cluster.moref.type, cluster.moref.value);
var witnessHostMoRef = new VsanManagedObjectReference(witnessHost.moref.type, witnessHost.moref.value);

// Create fault domain config
var hostsInPreferredFD = System.getModule("com.vmware.library.vsan.cluster.faultdomain").getAllHostSystemsOfFaultDomain(cluster, preferredFaultDomain);
var hostsInSecondaryFD = System.getModule("com.vmware.library.vsan.cluster.faultdomain").getAllHostSystemsOfFaultDomain(cluster, secondaryFaultDomain);
var faultDomainConfig = new VsanVimClusterVSANStretchedClusterFaultDomainConfig();
faultDomainConfig.firstFdName = preferredFaultDomain;
faultDomainConfig.secondFdName = secondaryFaultDomain;
faultDomainConfig.firstFdHosts = hostsInPreferredFD.map(function (item) {return new VsanManagedObjectReference(item.moref.type, item.moref.value)});
faultDomainConfig.secondFdHosts = hostsInSecondaryFD.map(function (item) {return new VsanManagedObjectReference(item.moref.type, item.moref.value)});

var isVsanEsa = System.getModule("com.vmware.library.vsan").isVsanEsa(cluster);

if (isVsanEsa == false) {
// Create disk mapping
var mapping = null;
if (claimDisk && ssdName) {
   var ssd = System.getModule("com.vmware.library.vc.storage.vsan").findVsanDisks(witnessHost, [ssdName])[0];
   var vsanSSD = convertToVsanHostScsiDisk(ssd);
   var hdds = System.getModule("com.vmware.library.vc.storage.vsan").findVsanDisks(witnessHost, hddNames);
   var vsanHDDs = hdds.map(convertToVsanHostScsiDisk);
   mapping = new VsanVsanHostDiskMapping();
   mapping.ssd = vsanSSD;
   mapping.nonSsd = vsanHDDs;
}
   var vsanTask = stretchedClusterSystem.vSANVcConvertToStretchedCluster(clusterMoRef, faultDomainConfig, witnessHostMoRef, preferredFaultDomain, mapping, null);
   task = System.getModule("com.vmware.library.vsan").getVcTaskById(cluster.sdkConnection, vsanTask.value);
} else {
   var addStoragePoolDiskSpec = null;
   if (claimDisk && disksClaimedFromWitnessHost != null && disksClaimedFromWitnessHost.length != 0) {
   addStoragePoolDiskSpec = new VsanVsanAddStoragePoolDiskSpec();
   addStoragePoolDiskSpec.host = witnessHostMoRef;
   var storagepooldisks = []
   for (var i = 0; i < disksClaimedFromWitnessHost.length; i++) {
      var storagepooldisk = new VsanVsanStoragePoolDisk();
      storagepooldisk.diskName = disksClaimedFromWitnessHost[i];
      storagepooldisk.diskType = "singleTier";
      storagepooldisks.push(storagepooldisk)
   }
   addStoragePoolDiskSpec.disks = storagepooldisks;
   }
   var vsanTask = stretchedClusterSystem.vSANVcConvertToStretchedCluster(clusterMoRef, faultDomainConfig, witnessHostMoRef, preferredFaultDomain, null, addStoragePoolDiskSpec);
   task = System.getModule("com.vmware.library.vsan").getVcTaskById(cluster.sdkConnection, vsanTask.value);
}
function convertToVsanHostScsiDisk(hostScsiDisk) {
   var result = new VsanHostScsiDisk();
   result.canonicalName = hostScsiDisk.canonicalName;
   result.deviceName = hostScsiDisk.deviceName;
   result.devicePath = hostScsiDisk.devicePath;
   result.deviceType = hostScsiDisk.deviceType;
   result.uuid = hostScsiDisk.uuid;
   result.ssd = hostScsiDisk.ssd;
   result.capacity = new VsanHostDiskDimensionsLba();
   result.capacity.block = hostScsiDisk.capacity.block;
   result.capacity.blockSize = hostScsiDisk.capacity.blockSize;
}