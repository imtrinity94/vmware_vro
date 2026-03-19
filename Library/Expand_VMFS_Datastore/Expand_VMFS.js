/**
 * Expand VMFS
 *
 * @param {VC:Datastore} datastore - [object Object]
 * @return {VC:Datastore} expandedDatastore - [object Object]
 */
var totalHosts = datastore.host.length;
System.debug("Total hosts : " + totalHosts);
var hosts = new Array();
for (var i = 0; i < totalHosts; i++)
{
	hosts[i]=datastore.host[i].key;
	System.debug(hosts[i].name);
}
System.log("Rescanning ESXi hosts... " );
for (i = 0; i < totalHosts; i++)
{
	System.log(hosts[i].name);
	System.getModule("com.vmware.library.vc.storage").rescanAll(hosts[i]) ;
}
/*
var esxihost = datastore.host[0].key;
System.log("Rescanning ESXi host " + esxihost.name);
System.getModule("com.vmware.library.vc.storage").rescanAll(esxihost);
*/
var datastoreSystem = hosts[0].configManager.datastoreSystem;
var expandSpec = datastoreSystem.queryVmfsDatastoreExpandOptions(datastore);
expandedDatastore = datastoreSystem.expandVmfsDatastore(datastore, expandSpec[0].spec);
var newSize = (expandedDatastore.info.vmfs.capacity / 1024 / 1024 /1024);
System.log("New capacity for datastore " + expandedDatastore.name + " is " + newSize + " GB");


