/**
 * Map Machines
 *
 * @param {CS:PhysicalMachine} pMachine - [object Object]
 * @param {boolean} multiple - [object Object]
 * @param {Array/CS:PhysicalMachine} physicalMachines
 * @param {Array/CS:PhysicalMachine} machines
 * @param {string} status - [object Object]
 * @param {string} upgradability - [object Object]
 * @return {Array/CS:PhysicalMachine} machines
 */
if (multiple) {
	if (physicalMachines && physicalMachines.length > 0) {
		machines = physicalMachines;
	} else {
		throw "[Invalid Input] Expecting list of physical machines.";
	}
} else {
	if (!pMachine) {
		throw "[Invalid Input] Expecting physical machine instance.";
	}
	machines = new Array();
	machines.push(pMachine);
}
System.log("Current agent upgrad status : " + upgradability);
System.log("Current Status : " + status);