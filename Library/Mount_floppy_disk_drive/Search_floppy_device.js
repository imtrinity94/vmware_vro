/**
 * Search floppy device
 *
 * @param {VC:VirtualMachine} vm
 * @return {Any} floppy
 */
var devices = vm.config.hardware.device;
floppy = null;
for (var i in devices) {
	System.log(System.getObjectClassName(devices[i]));
	if (devices[i] instanceof VcVirtualFloppy) {
		floppy = devices[i];
		break;
	}
}