/**
 * Configuration Parameters Of Datastore
 *
 * @param {VC:VirtualMachine} sourceVM
 * @param {PS:Snapshot} sourceVMSnapshot
 * @param {VC:VirtualMachine} targetVM
 * @return {VC:ClusterComputeResource} cluster
 * @return {string} DatastoreName
 * @return {VC:Datastore} existingDatastore
 * @return {VC:Datastore} targetDatastore
 */
var computeResource = System.getModule("com.vmware.library.vc.cluster").getComputeResourceOfVm(sourceVM);
cluster = computeResource;
System.log("Cluster for VM " + sourceVM.name + " is: " + cluster);
var ds = sourceVM.datastore;
//To get six-digit Random Number.
while(true){
	var randomNo=Math.floor(Math.random() * 1000000);
 	if(randomNo > 99999 && randomNo < 1000000){
		break;
	}
}
DatastoreName = ds[0].name + "-" + randomNo;
existingDatastore = ds[0];
targetDS = targetVM.datastore;
targetDatastore = targetDS[0];

//Check if selected snapshot is of correct datastore
var snap = sourceVMSnapshot.source;
var dsVolName = System.getModule("com.purestorage.flasharray.vmware.vcenter").vmfsVolumeToFAVolume(existingDatastore) ;

if(snap != dsVolName.name){
throw "The specified snapshot is not the part of datastore '"+ dsVolName.name + "' for VM '" + sourceVM.name + "'";
}