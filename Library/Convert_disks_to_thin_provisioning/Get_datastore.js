/**
 * Get datastore
 *
 * @param {VC:Datastore} datastore
 * @param {boolean} validDatastoreTarget
 * @param {Array/VC:VirtualMachine} vmToConvert
 * @return {boolean} validDatastoreTarget
 */
//Look if it is a valid datastore target to temporary move the vms
var actionResult = System.getModule("com.vmware.library.vc.datastore").getValidDatastoreForConversion(datastore,vmToConvert) ;
if(actionResult==null || actionResult.length<=0){
	validDatastoreTarget=false;
	System.error("There is no valid datastore to temporary move the vms.");
}