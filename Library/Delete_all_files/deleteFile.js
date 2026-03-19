/**
 * Deletes the specified files from the datastore. If a valid virtual disk file is specified, then all the components of the virtual disk are deleted.
 *
 * @param {VC:Datastore} datastore
 * @param {string} filePath
 */
//Auto generated script, cannot be modified !
System.getModule("com.vmware.library.vc.datastore.files").deleteFile(datastore,filePath) ;