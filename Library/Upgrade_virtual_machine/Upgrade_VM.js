/**
 * Upgrade VM
 *
 * @param {VC:VirtualMachine} vm
 * @param {string} version
 * @param {boolean} forceUpgrade
 * @return {VC:Task} task
 */
if (vm.summary.guest.toolsVersionStatus == "guestToolsNeedUpgrade" || vm.summary.guest.toolsVersionStatus == "guestToolsNotInstalled") {
	System.log("Tools require upgrade for vm");
	if (!forceUpgrade) {
		System.log("Tools require upgrade for vm and forceUpgrade not set");
		throw "Tools require upgrade for vm and forceUpgrade not set";
	}	
}


if(version=="")
	version = null;
task = vm.upgradeVM_Task(version);