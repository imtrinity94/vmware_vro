/**
 * Validate
 *
 * @param {boolean} enableVsanTraffic
 * @param {string} networkName
 * @param {VC:ClusterComputeResource} cluster
 * @param {boolean} claimDisks
 * @param {Array/CompositeType(host:VC:HostSystem,cacheDisks:Array/string,capacityDisks:Array/string):VsanDiskMapping} diskMappings
 * @param {boolean} configureFaultDomain
 * @param {Array/CompositeType(name:string,hosts:Array/VC:HostSystem):VsanFaultDomain} faultDomainConfiguration
 */
if (enableVsanTraffic == true) {
   if (!networkName) {
      throw "The network name is not provided to enable vSAN traffic."
   }
}

var allHostSystems = cluster.sdkConnection.getAllHostSystems(null, null);

if (claimDisks) {
   for (var i in diskMappings) {
      var host = diskMappings[i].host;
      var ssdName = diskMappings[i].cacheDisk;
      var hddNames = diskMappings[i].capacityDisks;

      if (host.parent.moref.value != cluster.moref.value) {
         throw "DiskMappingError: Host [" + host.name + "] is not part of cluster [" + cluster.name + "]";
      }

      var ssds = System.getModule("com.vmware.library.vc.storage.vsan").findVsanDisks(host, [ssdName]);
      var ssd = null;
      for (var i in ssds) {
         if (ssds[i].displayName === ssdName) {
            ssd = ssds[i];
            break;
         }
      }
      if (ssd == null) {
         throw "DiskMappingError: Host [" + host.name + "] does not have disk named [" + ssdName + "]";
      }
      if (ssd.ssd == false) {
         throw "DiskMappingError: Disk [" + ssdName + "] in host [" + host.name + "] is not an SSD.";
      }

      var hdds = System.getModule("com.vmware.library.vc.storage.vsan").findVsanDisks(host, hddNames);
      for (var i in hddNames) {
         var hdd = null;
         for (var j in hdds) {
            if (hdds[j].displayName === hddNames[i]) {
               hdd = hdds[j];
               break;
            }
         }
         if (hdd == null) {
            throw "DiskMappingError: Host [" + host.name + "] does not have disk named [" + hddNames[i] + "]";
         }
         if (hdd.ssd == true) {
            throw "DiskMappingError: Disk [" + hddNames[i] + "] in host [" + host.name + "] is not an HDD.";
         }
      }
   }
}

if (configureFaultDomain) {
   var fdNames = [];
   for (var i in faultDomainConfiguration) {
      // Verify that there are no duplicate fault domain names
      var fdName = faultDomainConfiguration[i].name;
      for (var k in fdNames) {
         if (fdName === fdNames[k]) {
            throw "FaultDomainError: Duplicate fault domain name [" + fdName +"]";
         }
      }
      fdNames.push(fdName);

      // Verify that hosts belong to the cluster
      var hosts = faultDomainConfiguration[i].hosts;
      for (var j in hosts) {
         var host = hosts[j];
         if (host.parent.moref.value != cluster.moref.value) {
            throw "FaultDomainError: Host [" + host.name + "] is not part of cluster [" + cluster.name + "]";
         }
      }
   }
}
