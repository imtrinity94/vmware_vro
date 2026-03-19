/**
 * protect Datastore with Schedule
 *
 * @param {VC:Datastore} datastore
 * @param {StoreServ:ProtectionConnection} connection
 * @param {StoreServ:ProtectionPolicy} protectionPolicy
 * @param {string} name
 * @param {string} description
 * @param {Date} startDateTime
 * @param {Date} endDate
 * @param {string} frequency
 * @param {number} recurMin
 * @param {number} recurHrs
 * @param {number} recurDays
 * @param {Array/string} frequencyWeekly
 * @param {string} frequencyMonthly
 * @param {boolean} continueOnVMwareError
 * @param {string} snapshotName
 * @param {Array/VC:VirtualMachine} virtualMachine
 * @param {string} backupName
 * @param {string} weekFrequency
 * @param {string} vcId
 * @param {string} lunWWN
 * @param {string} moUuid
 * @param {string} recurFreq
 * @return {string} scheduleResult
 * @return {StoreServ:Datastore} dstore
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
	scheduleResult = System.getModule("com.hpe.rmc.snapshot").protectDSwithSchedule(datastore,protectionPolicy,snapshotName,
			name,description,startDateTime,endDate,recurFreq,recurMin,recurHrs,recurDays,weekFrequency,frequencyMonthly,
			continueOnVMwareError,vcId,lunWWN,moUuid,frequencyWeekly,frequency,virtualMachine,connection) ;
} else {
	scheduleResult = System.getModule("com.hpe.rmc.backup").backupDSwithSchedule(datastore,protectionPolicy,snapshotName,
			name,description,startDateTime,endDate,recurFreq,recurHrs,recurDays,weekFrequency,frequencyMonthly,
			continueOnVMwareError,vcId,lunWWN,moUuid,backupName,virtualMachine,frequencyWeekly,frequency,connection) ;
}