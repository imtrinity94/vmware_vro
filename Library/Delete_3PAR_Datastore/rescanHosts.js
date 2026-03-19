/**
 * rescanHosts
 *
 * @param {Array/VC:HostSystem} hostToRescan
 */
// Scan the hosts
for each(var esxiHost in hostToRescan) {
	System.log("Rescanning ESXi host: " + esxiHost.name);
	System.getModule("com.vmware.library.vc.storage").rescanAll(esxiHost);
	System.log("Rescanning ESXi host: " + esxiHost.name + " completed.");
}