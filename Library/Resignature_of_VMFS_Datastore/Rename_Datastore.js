/**
 * Rename Datastore
 *
 * @param {VC:Datastore} newDatastore
 * @param {string} datastoreName - [object Object]
 * @return {VC:Datastore} newDatastoreOut
 */

if(!newDatastore) throw "Error in rename datastore: Datastore paramter is null!";

if(datastoreName.length > 0) {
	newDatastore.renameDatastore(datastoreName);
	System.log("Renaming the datastore to: "+ datastoreName);
 }

newDatastoreOut = newDatastore;
