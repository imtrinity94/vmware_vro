/**
 * Prepare disk mappings
 *
 * @param {boolean} useDefaultDiskMapping
 * @param {Array/CompositeType(host:VC:HostSystem,cacheDisks:Array/string,capacityDisks:Array/string):VsanDiskMapping} diskMappings
 * @param {VC:ClusterComputeResource} cluster
 * @param {string} diskGroupType
 * @return {Array/CompositeType(host:VC:HostSystem,cacheDisks:Array/string,capacityDisks:Array/string):VsanDiskMapping} vsanDiskMappings
 */
if (useDefaultDiskMapping) {
   var hostSystems = cluster.host;
   vsanDiskMappings = [];
   for (var i in hostSystems) {
      var host = hostSystems[i];
      var diskMappingConfig = new Object();
      diskMappingConfig.host = host;
      diskMappingConfig.cacheDisks = [];
      diskMappingConfig.capacityDisks = [];
      if (diskGroupType === "All Flash") {
         var ssds = System.getModule("com.vmware.library.vc.storage.vsan").getVsanDiskNames(host,"eligible",true);
         var cacheDiskSize = getSmallestDiskSize(host, ssds);
         for (var j in ssds) {
            var ssd = ssd[j];
            var size = ssd.capacity.block * ssd.capacity.blockSize;
            if (size <= cacheDiskSize) {
               diskMappingConfig.cacheDisks.push(ssd);
            } else {
               diskMappingConfig.capacityDisks.push(ssd);
            }
         }
      } else if (diskGroupType === "Hybrid") {
         var ssds = System.getModule("com.vmware.library.vc.storage.vsan").getVsanDiskNames(host,"eligible",true);
         var hdds = System.getModule("com.vmware.library.vc.storage.vsan").getVsanDiskNames(host,"eligible",false);
         for (var j in ssds) {
            diskMappingConfig.cacheDisks.push(ssds[j]);
         }
         for (var k in hdds) {
            diskMappingConfig.capacityDisks.push(hdds[k]);
         }
      } else {
         throw "Disk group type [" + diskGroupType + "] is not valid. Valid values are [All Flash] and [Hybrid].";
      }
      vsanDiskMappings.push(diskMappingConfig);
   }

} else {
   vsanDiskMappings = diskMappings;
}

function getSmallestDiskSize (host, diskNames) {
   var disks = System.getModule("com.vmware.library.vc.storage.vsan").findVsanDisks(host,diskNames);
   var smallestDiskSize = 0;
   for (var i in disks) {
      size = ssd.capacity.block * ssd.capacity.blockSize;
      if (size < smallestDiskSize) {
         smallestDiskSize = size;
      }
   }
   return smallestDiskSize;
}