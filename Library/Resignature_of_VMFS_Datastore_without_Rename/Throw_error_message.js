/**
 * Throw error message
 *
 * @param {VC:HostSystem} host
 * @param {Any} hostScsiDisk
 * @return {Any} vmfsDatastoreOption
 * @return {string} errorMessage - [object Object]
 */
errorMessage = "The given snapshot either contains no formatting or formatting other than VMFS. Hence can not create datastore from this snapshot.";
Server.error(errorMessage);
 throw errorMessage; 