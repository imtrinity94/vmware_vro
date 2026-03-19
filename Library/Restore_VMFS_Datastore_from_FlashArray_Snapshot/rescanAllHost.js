/**
 * rescanAllHost
 *
 * @param {Array/VC:HostSystem} hostToRescan
 * @param {VC:Datastore} datastore - [object Object]
 * @return {VC:Datastore} datastoreOut - [object Object]
 */

for each(var esxihost in hostToRescan) {
	System.log("Rescanning ESXi host " + esxihost.name);
	System.getModule("com.vmware.library.vc.storage").rescanAll(esxihost);
}

datastoreOut = datastore;