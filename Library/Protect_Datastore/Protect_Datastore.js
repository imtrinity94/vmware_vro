/**
 * Protect Datastore
 *
 * @param {VC:Datastore} datastore
 * @param {StoreServ:ProtectionConnection} connection
 * @param {StoreServ:ProtectionPolicy} protectionPolicy
 * @param {boolean} continueOnVMwareError
 * @param {string} snapshotName
 * @param {string} backupName
 * @return {StoreServ:ProtectionTask} result
 */
var flag = false;
var datastores = System.getModule("com.vmware.library.vc.datastore").getAllDatastores();

for (i = 0;i<datastores.length;i++)
{
	if (datastores[i].summary.type == "VVOL")
	{			
		if(datastores[i].info.vvolDS.name === datastore.name)
		{
			flag = true;
		}
	}
}

if (flag == true)
	throw "Cannot protect VVol Datastore";


if (protectionPolicy.policyType === "Snapshot") {
	result = System.getModule("com.hpe.rmc.datastore").protectDatastore(connection, datastore, protectionPolicy, snapshotName,
		continueOnVMwareError) ;
} else {
	result = System.getModule("com.hpe.rmc.backup").backupDatastore(connection, datastore, protectionPolicy, snapshotName, backupName, 
		continueOnVMwareError);
}