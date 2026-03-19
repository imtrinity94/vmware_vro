/**
 * CopyVMDKFile
 *
 * @param {string} sourceVmdkFile
 * @param {VC:Datastore} targetDatastore
 * @param {string} targetVmdkFile
 * @param {boolean} overwriteTargetFile
 * @param {StoreServ:ProtectionSnapshot} snapshot
 * @param {StoreServ:ProtectionConnection} connection
 * @param {string} vdTargetDirectory
 * @param {string} virtualDiskToCopy
 * @param {string} sourceDatastore
 * @return {StoreServ:ProtectionTask} result
 */
var targetdatastoreName = targetDatastore.name;
var sourcedatastoreName = sourceDatastore;

sourceVmdkFile = "[" + sourcedatastoreName + "]" + virtualDiskToCopy;

// format of target vmdk path will be "[data store name] directory//New_test_VM1.vmdk"
//

if(vdTargetDirectory != undefined && vdTargetDirectory != null && vdTargetDirectory != "") {
	targetVmdkFile = "[" + targetdatastoreName + "] " + vdTargetDirectory + "/" + virtualDiskToCopy.substring((virtualDiskToCopy.lastIndexOf('/') + 1), virtualDiskToCopy.length);
}else {
	targetVmdkFile = "[" + targetdatastoreName + "] " + virtualDiskToCopy.substring(0, virtualDiskToCopy.indexOf('/')) + "//" + virtualDiskToCopy.substring((virtualDiskToCopy.indexOf('/') + 1), virtualDiskToCopy.length);
}

result = System.getModule("com.hpe.rmc.snapshot").snapshotCopyVMDKOperation(snapshot, sourceVmdkFile, targetVmdkFile, overwriteTargetFile, connection) ;