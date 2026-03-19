/**
 * Configuration Parameters
 *
 * @param {VC:VirtualMachine} vm
 * @param {Any} computeResource
 * @param {PS:Snapshot} snap
 * @return {string} vmName
 * @return {VC:ClusterComputeResource} cluster
 * @return {string} DatastoreName
 * @return {VC:Datastore} existingDatastore
 */
cluster = computeResource;
vmName = vm.name;
System.log("Cluster for VM " + vmName + " is: " + cluster);

var ds = vm.datastore;

//To get six-digit Random Number.
while(true){
	var randomNo=Math.floor(Math.random() * 1000000);
 	if(randomNo > 99999 && randomNo < 1000000){
		break;
	}
}
DatastoreName = ds[0].name + "-" + randomNo;
existingDatastore = ds[0];

var snapVolName = snap.source;
var vmDS = vm.datastore;

var dsVolName = System.getModule("com.purestorage.flasharray.vmware.vcenter").vmfsVolumeToFAVolume(vmDS[0]) ;

if(snapVolName != dsVolName.name){
	throw "The specified snapshot is not the part of datastore '"+ dsVolName.name + "' for VM '" + vm.name + "'";
}