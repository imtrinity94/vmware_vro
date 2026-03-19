/**
 * Parse JSON
 *
 * @param {string} jsonConfig
 * @return {VC:HostFolder} hostFolder
 * @return {string} clusterName
 * @return {Array/VC:HostSystem} existingHosts
 * @return {boolean} addNewHosts
 * @return {Array/string} newHosts
 * @return {string} username
 * @return {SecureString} password
 * @return {boolean} enableVsanTraffic
 * @return {string} networkName
 * @return {string} deploymentType
 * @return {boolean} largeScaleClusterSupport
 * @return {boolean} claimDisks
 * @return {boolean} configureFaultDomain
 * @return {string} primaryFaultDomainName
 * @return {string} secondaryFaultDomainName
 * @return {VC:HostSystem} witnessHost
 * @return {number} port
 * @return {Array/CompositeType(name:string,hostNames:Array/string):VsanFaultDomainConfig} faultDomainConfiguration
 * @return {Array/string} primaryFaultDomainHostNames
 * @return {Array/string} secondaryFaultDomainHostNames
 * @return {Array/CompositeType(hostName:string,cacheDisks:Array/string,capacityDisks:Array/string):VsanDiskMappingConfig} diskMappings
 * @return {boolean} dedupAndCompression
 * @return {string} diskGroupCreationType
 */
var config = JSON.parse(jsonConfig);
if (config.vcenter == null) {
   throw "ConfigError: The key [vcenter] is not defined in JSON configuration."
}
var sdkConnections = VcPlugin.allSdkConnections;
var sdkConnection = null;
for (var i in sdkConnections) {
   if (sdkConnections[i].name === config.vcenter) {
      sdkConnection = sdkConnections[i];
      break;
   }
}
if (sdkConnection == null) {
   throw "ConfigError: Could not find vcenter by name [" + config.vcenter + "] in the inventory."
}

if (config.datacenter == null) {
   throw "ConfigError: The key [datacenter] is not defined in JSON configuration."
}

var datacenters = sdkConnection.getAllDatacenters(null, "xpath:name='" + config.datacenter + "'");
if (datacenters.length == 0) {
   throw "ConfigError: Could not find datacenter [" + config.datacenter + "] in the vCenter."
}
var datacenter = datacenters[0];

var hostFolders = sdkConnection.getAllHostFolders(null, "xpath:id='" + datacenter.hostFolder.id + "'");
if (hostFolders.length == 0) {
   throw "ConfigError: Could not find host folder in datacenter [" + datacenter.name + "]."
}
hostFolder = hostFolders[0];
clusterName = config.clusterName;

var existingHostSystems = [];
var allHostSystems = sdkConnection.getAllHostSystems(null, null);
if (config.existingHosts != null) {
   for (var i in config.existingHosts) {
      for (var j in allHostSystems) {
         if (allHostSystems[j].name === config.existingHosts[i]) {
            existingHostSystems.push(allHostSystems[j]);
            break;
         }
      }
   }
   existingHosts = existingHostSystems;
}

if (config.newHosts) {
   addNewHosts = true;
   var newHostNames = [];
   for (var i in config.newHosts.dnsNameOrIP) {
      newHostNames.push(config.newHosts.dnsNameOrIP[i]);
   }
   newHosts = config.newHosts.dnsNameOrIP;
   username = config.newHosts.username;
   password = config.newHosts.password;
}

enableVsanTraffic = config.enableVsanTraffic;
networkName = config.networkName;
deploymentType = config.deploymentType;
dedupAndCompression = config.dedupAndCompression;
largeScaleClusterSupport = config.largeScaleClusterSupport;
claimDisks = config.claimDisks;
if (config.claimDisks) {
   if (config.diskGroupCreationType === "All Flash" || config.diskGroupCreationType === "Hybrid") {
      diskGroupCreationType = config.diskGroupCreationType;
   } else {
      throw "ConfigError: Valid values for [diskGroupCreationType] are [All Flash] and [Hybrid]."
   }
   diskMappings = [];
   for (var i in config.diskMappings) {
      var diskMappingConfig = new Object();
      diskMappingConfig.hostName = config.diskMappings[i].host;
      diskMappingConfig.cacheDisks = config.diskMappings[i].cacheDisk;
      diskMappingConfig.capacityDisks = [];
      for (var j in config.diskMappings[i].capacityDisks) {
         diskMappingConfig.capacityDisks.push(config.diskMappings[i].capacityDisks[j]);
      }
      diskMappings.push(diskMappingConfig);
   }
}

if (config.deploymentType === "Single site cluster") {
   if (config.faultDomainConfiguration) {
      configureFaultDomain = true;
      var faultDomainConfiguration = [];
      for (var i in config.faultDomainConfiguration) {
         var fdConfig = new Object();
         fdConfig.name = config.faultDomainConfiguration[i].name;
         fdConfig.hostNames = [];
         for (var j in config.faultDomainConfiguration[i].hosts) {
            fdConfig.hostNames.push(config.faultDomainConfiguration[i].hosts[j]);
         }
         faultDomainConfiguration.push(fdConfig);
      }
   }
} else if (config.deploymentType === "Stretched cluster") {
   if (config.primaryFaultDomainName == null) {
      throw "ConfigError: [primaryFaultDomainName] must be defined for deployment type [Stretched cluster].";
   }
   primaryFaultDomainName = config.primaryFaultDomainName;
   if (config.secondaryFaultDomainName == null) {
      throw "ConfigError: [secondaryFaultDomainName] must be defined for deployment type [Stretched cluster].";
   }
   secondaryFaultDomainName = config.secondaryFaultDomainName;
   if (config.witnessHost == null) {
      throw "ConfigError: [witnessHost] must be defined for deployment type [Stretched cluster].";
   }
   witnessHost = getHostSystemByName(config.witnessHost, allHostSystems);
   if (witnessHost == null) {
      throw "ConfigError: Could not find witness host [" + config.witnessHost + "] in the inventory.";
   }

   if (config.primaryFaultDomainHosts == null) {
      throw "ConfigError: [primaryFaultDomainHosts] must be defined for deployment type [Stretched cluster].";
   }
   primaryFaultDomainHostNames = [];
   for (var i in config.primaryFaultDomainHosts) {
      primaryFaultDomainHostNames.push(config.primaryFaultDomainHosts[i]);
   }
   if (config.secondaryFaultDomainHosts == null) {
      throw "ConfigError: [secondaryFaultDomainHosts] must be defined for deployment type [Stretched cluster].";
   }
   secondaryFaultDomainHostNames = [];
   for (var i in config.secondaryFaultDomainHosts) {
      secondaryFaultDomainHostNames.push(config.secondaryFaultDomainHosts[i]);
   }
} else {
   throw "ConfigError: The valid values of deploymentType are [Single site cluster] and [Stretched cluster]."
}

function getHostSystemByName(hostName, allHostSystems) {
   if (allHostSystems[i].name === hostName) {
      return allHostSystems[i];
   }
   return null;
}