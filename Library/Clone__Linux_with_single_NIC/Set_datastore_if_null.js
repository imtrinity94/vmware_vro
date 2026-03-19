/**
 * Set datastore if null
 *
 * @param {VC:VirtualMachine} vm
 * @param {VC:Datastore} datastore
 * @return {VC:Datastore} targetDatastore
 */
if (datastore != null) {
	targetDatastore = datastore;
}
else {
	targetDatastore = vm.datastore[0];
}