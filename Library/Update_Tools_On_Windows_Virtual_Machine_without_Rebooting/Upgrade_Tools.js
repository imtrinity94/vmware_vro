/**
 * Upgrade Tools
 *
 * @param {VC:VirtualMachine} vm
 * @return {VC:Task} task
 */
if (vm.summary.guest.toolsVersionStatus != "guestToolsNeedUpgrade") {
	System.log("Tools do not require upgrade for vm: " + vm.name);
} 
else {
	System.log("Upgrading tools for vm: " + vm.name);
	task = System.getModule("com.vmware.library.vc.vm.tools").upgradeToolsAtNextReboot(vm);
} 