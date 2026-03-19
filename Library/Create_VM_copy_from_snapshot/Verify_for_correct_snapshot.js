/**
 * Verify for correct snapshot
 *
 * @param {PS:Snapshot} snap - [object Object]
 * @param {string} DatastoreName
 * @param {VC:VirtualMachine} vm - [object Object]
 */
var snapVolName = snap.source;
var vmDS = vm.datastore;

var dsVolName = System.getModule("com.purestorage.flasharray.vmware.vcenter").vmfsVolumeToFAVolume(vmDS[0]) ;

if(snapVolName != dsVolName.name){
	throw "The specified snapshot is not the part of datastore '"+ dsVolName.name + "' for VM '" + vm.name + "'";
}