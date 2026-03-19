/**
 * Protect VMs
 *
 * @param {Array/VC:VirtualMachine} vm
 * @param {StoreServ:ProtectionConnection} connection
 * @param {StoreServ:ProtectionPolicy} protectionPolicy
 * @param {string} snapshotName
 * @param {string} backupName
 * @return {Array/StoreServ:ProtectionTask} result
 */
if (protectionPolicy.policyType === "Snapshot") {
	result = System.getModule("com.hpe.rmc.snapshot").protectVMs(connection, vm, protectionPolicy, snapshotName);
} else {
	result = System.getModule("com.hpe.rmc.backup").backupVMs(connection, vm, protectionPolicy, snapshotName, backupName);
}

//var vmId = [];
//
//if(vm != undefined)
//{
//	for (var i = 0; i < vm.length; i++)	
//	{
//		vmId.push(vm[i].id);
//	}
//}
//
//var res = connection.protectVMs(vmId, protectionPolicy);
//
//if(res != undefined){
//	result = res;
//	System.log(result);	
//}