/**
 * Set error message
 *
 * @param {VC:HostSystem} host
 * @param {Any} hostScsiDisk
 * @return {Any} vmfsDatastoreOption
 * @return {string} errorMessage - [object Object]
 */
errorMessage = "Cannot resignature. Invalid snapshot / volume.";
Server.error(errorMessage);
 throw errorMessage; 