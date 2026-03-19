/**
 * Rescan Host
 *
 * @param {VC:ClusterComputeResource} cluster
 */
var hosts = cluster.host;
for (i = 0; i < hosts.length; i++){
	System.getModule("com.vmware.library.vc.storage").rescanAll(hosts[i]);
}
