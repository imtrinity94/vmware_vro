/**
 * Resignature Unresolved VMFS volume
 *
 * @param {VC:HostSystem} host - [object Object]
 * @param {string} extntDevicePath
 * @param {Any} hostScsiDisk - [object Object]
 * @param {Any} hostDatastoreSystem
 * @return {VC:Datastore} newDatastore
 */
System.log("Unresolved Vmfs Volume device path: "+extntDevicePath);
System.debug("Total Datastores before resig: "+host.datastore.length);
var extentDevicePaths= new Array();
extentDevicePaths[0] = extntDevicePath;
var spec = new VcHostUnresolvedVmfsResignatureSpec();
spec.extentDevicePath = extentDevicePaths; 
var task = hostDatastoreSystem.resignatureUnresolvedVmfsVolume_Task(spec);
while(task.info.state.value == "running"){}
System.log("Resignature task complete with state: "+ task.info.state.value);

if(task.info.state.value != "success") {
	throw "Error in Resignature operation";
}
// Return the new datastore created after this resignature operation.


var datastores = host.datastore;
System.debug("Total Datastores after resig: "+datastores.length);

newDatastore = getResignaturedDatastore(datastores);

if(newDatastore != null) {
	System.log("New Datastore created after resignaturing: "+ newDatastore.name);
}

function getResignaturedDatastore(datastores) {
	System.debug("getResignaturedDatastore called.");
	if(!datastores) throw "Error in getting resignatured datastore: datastores must not be empty!"
	
	for(i = 0; i < datastores.length; i++) 
		if (datastores[i].summary.type == "VMFS")  {
			System.debug("checking datastore : " + datastores[i].name);
			if(isResignaturedDatastore(datastores[i])) {
			System.log("datastore found: " + datastores[i].name);
				return datastores[i];
			}
		}
		
 return null;
}

function isResignaturedDatastore(datastore) {
	System.debug("isResignaturedDatastore called with datastore name: " + datastore.name);
	if(datastore.info.vmfs) {
		System.debug("hostScsiDisk.canonicalName: " + hostScsiDisk.canonicalName);
		System.debug("datastore.info.vmfs.extent[0].diskName: " + datastore.info.vmfs.extent[0].diskName);
		if(hostScsiDisk.canonicalName == datastore.info.vmfs.extent[0].diskName) {
			System.log("Resignatured Datastore found: "+ datastore.name);
			return true;
		}
	}
	return false;
 }