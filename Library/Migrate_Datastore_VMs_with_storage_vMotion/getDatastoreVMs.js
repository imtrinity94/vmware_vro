/**
 * getDatastoreVMs
 *
 * @param {VC:Datastore} vmsdatastore
 * @return {Array/VC:VirtualMachine} datastorevms
 */
datastorevms = vmsdatastore.vm;

if (datastorevms.length == 0) {
	throw "No Virtual Machines are present in the Datastore "+vmsdatastore.name;
}