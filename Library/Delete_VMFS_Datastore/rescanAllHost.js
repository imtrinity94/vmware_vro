/**
 * rescanAllHost
 *
 * @param {Array/VC:HostSystem} hostToRescan
 */

for each(var esxihost in hostToRescan) {
	System.log("Rescanning ESXi host " + esxihost.name);
	System.getModule("com.vmware.library.vc.storage").rescanAll(esxihost);
}