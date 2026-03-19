/**
 * Set host mappings
 *
 * @param {boolean} claimDisks
 * @param {Array/CompositeType(hostName:string,cacheDisks:Array/string,capacityDisks:Array/string):VsanDiskMappingConfig} diskMappings
 * @param {boolean} configureFaultDomain
 * @param {Array/CompositeType(name:string,hostNames:Array/string):VsanFaultDomainConfig} faultDomainConfiguration
 * @param {VC:HostFolder} hostFolder
 * @param {string} deploymentType
 * @return {Array/CompositeType(host:VC:HostSystem,cacheDisks:Array/string,capacityDisks:Array/string):VsanDiskMapping} diskMappingConfigs
 * @return {Array/CompositeType(name:string,hosts:Array/VC:HostSystem):VsanFaultDomain} faultDomainConfigs
 * @return {Array/VC:HostSystem} primaryFDHosts
 * @return {Array/VC:HostSystem} secondaryFDHosts
 * @return {boolean} defaultDiskClaim
 */
var allHostSystems = hostFolder.sdkConnection.getAllHostSystems(null, null);
if (configureFaultDomain) {
   faultDomainConfigs = new Array();
   for (var i in faultDomainConfiguration) {
      var fdConfig = new Object();
      fdConfig.name = faultDomainConfiguration[i].name;
      fdConfig.hosts = [];
      for (var j in faultDomainConfiguration[i].hostNames) {
         for (var k in allHostSystems) {
            if (allHostSystems[k].name === faultDomainConfiguration[i].hostNames[j]) {
               fdConfig.hosts.push(allHostSystems[k]);
               break;
            }
         }
      }
      faultDomainConfigs.push(fdConfig);
   }
}



if (claimDisks) {
   if (diskMappings != null && diskMappings.length > 0) {
      defaultDiskClaim = false;
      diskMappingConfigs = new Array();
      for (var i in diskMappings) {
         var diskMappingConfig = new Object();
         diskMappingConfig.cacheDisk = diskMappings[i].cacheDisk;
         diskMappingConfig.capacityDisks = diskMappings[i].capacityDisks;
         for (var k in allHostSystems) {
            if (allHostSystems[k].name === diskMappings[i].hostName) {
               diskMappingConfig.host = allHostSystems[k];
               break;
            }
         }
         diskMappingConfigs.push(diskMappingConfig);
      }
   } else {
      defaultDiskClaim = true;
   }
}