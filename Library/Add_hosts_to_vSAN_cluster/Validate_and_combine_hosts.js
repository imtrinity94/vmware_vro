/**
 * Validate and combine hosts
 *
 * @param {VC:ClusterComputeResource} cluster
 * @param {Array/VC:HostSystem} existingHosts
 * @param {Array/VC:ComputeResource} newlyAddedHosts
 * @return {Array/VC:HostSystem} allHosts
 */
var hostSystems  = cluster.sdkConnection.getAllHostSystems(null, null);
System.debug("sdk get" + hostSystems);
var allAddedHosts = [];
if (newlyAddedHosts) {
   for (var i in newlyAddedHosts) {
      // Get HostSystem from ComputeResource
      var newlyAddedHost = newlyAddedHosts[i].host[0];
      for (var j in hostSystems) {
         if (newlyAddedHost.moref.value === hostSystems[j].moref.value) {
            System.debug("Add new host: " + newlyAddedHost.name);
            allAddedHosts.push(hostSystems[j]);
            break;
         }
      }
   }
}
System.debug("exsiting" + existingHosts);
if (existingHosts) {
   for (var i in existingHosts) {
      System.debug("Add existing host: " + existingHosts[i].name);
      allAddedHosts.push(existingHosts[i]);
   }
}

allHosts = allAddedHosts;