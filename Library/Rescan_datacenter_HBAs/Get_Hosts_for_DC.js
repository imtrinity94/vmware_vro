/**
 * Get Hosts for DC
 *
 * @param {VC:Datacenter} datacenter
 * @return {Array/VC:HostSystem} allHosts
 * @return {number} hostCount
 */
// Verify a non-null Datacenter object was passed in
if (datacenter != null) {
	// Initialize working and output Arrays:
	var dcClusters = new Array();
	var allHosts = new Array();
	var allClusters = datacenter.vimHost.allClusterComputeResources;
	//System.log("Clusters count: "+allClusters.length);
	for(var i = 0 ; i < allClusters.length ; i++ ) {
		//System.log("Cluster: "+allClusters[i]);
		if (datacenter == System.getModule("com.vmware.library.vc.basic").getDatacenterForVimObject(allClusters[i])) {
			dcClusters.push(allClusters[i]);
		}
	}
	// Now go through each cluster and add all hosts to the allHosts array
	for(c in dcClusters){
		//System.log("Processing cluster: "+dcClusters[c]);
		if (dcClusters[c] != null) {
			var cHosts = dcClusters[c].host;
			//System.log("Found "+cHosts.length);
			for(h in cHosts){
				allHosts.push(cHosts[h]);
			}
		}
	}
	var hostCount = allHosts.length;
	if(hostCount < 1){
		throw("No hosts found for specified Datacenter");
	}
} else{
	throw("null Datacenter!");
}