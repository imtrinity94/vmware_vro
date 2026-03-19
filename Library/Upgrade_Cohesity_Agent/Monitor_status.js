/**
 * Monitor status
 *
 * @param {Array/CS:PhysicalMachine} machines
 * @param {CS:CohesityConnection} connection
 */
var ATTEMPTS = 10;
var SLEEP_PERIOD = 15000;

if (machines.length == 1) {
	var pM = machines[0];
	var i = 0;
	while (i < ATTEMPTS) {
		var machineInfo = CSProtectionSourceManager.getPhysicalMachineById(connection, pM.id);
		if (!machineInfo) {
			System.error("Failed to monitor status of upgrade. Check Cohesity UI.");
			break;
		} else {
			var agent = machineInfo.physicalProtectionSource.agents[0];
			if (agent.upgradeStatus == 'kFinished') {
				if (!agent.upgradeStatusMessage) {
					System.log("Agent upgrade successfull.");
					break;
				} else {
					throw agent.upgradeStatusMessage;
				}
			} else {
				System.log("Agent upgrade in progress. Current status : " + agent.upgradeStatus);
				System.sleep(SLEEP_PERIOD);
			}
 		}
		i = i + 1;
	} 	
} else {
	System.log("Not monitoring the upgrade status. More than one physical agents upgraded.");
}