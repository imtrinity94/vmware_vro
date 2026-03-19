/**
 * protect VMs with Schedule
 *
 * @param {Array/VC:VirtualMachine} virtualMachine
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
 * @param {string} snapshotName
 * @param {string} weekFrequency
 * @param {string} vcId
 * @param {string} recurFreq
 * @param {string} backupName
 * @return {Array/string} scheduleResult
 */
if (protectionPolicy.policyType === "Snapshot") {
	scheduleResult = System.getModule("com.hpe.rmc.snapshot").protectVMsWithSchedule(connection, protectionPolicy, snapshotName, 
			name, description, startDateTime, endDate, recurFreq, recurMin, recurHrs, recurDays, weekFrequency, frequencyMonthly,
			virtualMachine, frequencyWeekly, frequency);
} else {
	scheduleResult = System.getModule("com.hpe.rmc.backup").backupVMsWithSchedule(connection, protectionPolicy, virtualMachine,
			snapshotName, name, description, startDateTime, endDate, recurFreq, recurHrs, recurDays, weekFrequency,
			frequencyMonthly, backupName, frequency, frequencyWeekly);
}

