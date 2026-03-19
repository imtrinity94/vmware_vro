/**
 * Rescan Hosts
 *
 * @param {Array/VC:HostSystem} hosts
 */
System.log("Rescanning the source Hosts.");
for (j = 0; j < hosts.length; j++){
 System.getModule("com.vmware.library.vc.storage").rescanAll(hosts[j]);
}