/**
 * Set host folder
 *
 * @param {VC:ClusterComputeResource} cluster
 * @param {string} username
 * @param {SecureString} password
 * @param {number} port
 * @param {number} portOfNewHosts
 * @param {Array/string} newHosts
 * @return {VC:HostFolder} hostFolder
 * @return {number} port
 */
System.debug("estetset")
var hostFolders = cluster.sdkConnection.getAllHostFolders(null, null);
for (var i in hostFolders) {
   if (hostFolders[i].moref.value === cluster.parent.moref.value) {
      hostFolder = hostFolders[i];
      break;
   }
}
if (newHosts != null && newHosts.length != 0) {
	if (!username || !password) {
	   throw "Error: Login credentials not provided for new hosts to add."
	}
}
if (portOfNewHosts == null) {
   port = 443;
} else {
   port = portOfNewHosts;
}
