/**
 * VM DatastoreList
 *
 * @param {Array/VC:VirtualMachine} virtualMachines
 * @return {Array/VC:Datastore} vmDatastoreList
 */
var datastoreList = new Array();
var vmDatastoreList = new Array();
for(var i = 0; i < virtualMachines.length ; i++)
{
 datastoreList = virtualMachines[i].datastore;
 vmDatastoreList.push(datastoreList[0]);
}
System.debug("datastoreList: "+vmDatastoreList);