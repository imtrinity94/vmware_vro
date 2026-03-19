/**
 * ExpandDatastore
 *
 * @param {VC:Datastore} datastore
 */
var hostsCount = datastore.host.length;
System.debug("Total hosts found : " + hostsCount);

var hosts = new Array();

for (var i = 0; i < hostsCount; i++)
{
	hosts[i]=datastore.host[i].key;
	System.debug(hosts[i].name);
}

System.log("Rescanning ESXi hosts " );

for (j = 0; j < hostsCount; j++)
{
	System.log("Host name  " + hosts[j].name);
	System.getModule("com.vmware.library.vc.storage").rescanAll(hosts[j]) ;
}

var  datastoreSys  =  hosts[0].configManager.datastoreSystem;
var expand = datastoreSys.queryVmfsDatastoreExpandOptions(datastore);
datastoreExpanded = datastoreSys.expandVmfsDatastore(datastore, expand[0].spec);
var size = (datastoreExpanded.info.vmfs.capacity / 1024 / 1024 /1024);
System.log("New size of datastore " + datastoreExpanded.name + " is " + size + " GB");

