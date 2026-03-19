/**
 * Rescanning all host of given cluster
 *
 * @param {VC:ClusterComputeResource} cluster
 */
var hosts=cluster.host;
System.log("Rescannig Cluster...");
for each(host in hosts){
	System.getModule("com.vmware.library.vc.storage").rescanAll(host);
}
System.log("Rescannig complete!!!");