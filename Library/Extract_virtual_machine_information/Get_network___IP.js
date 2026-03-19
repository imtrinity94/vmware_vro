/**
 * Get network / IP
 *
 * @param {VC:VirtualMachine} vm
 * @return {Array/string} ipAddresses
 * @return {Array/string} networks
 */
var devices = vm.config.hardware.device;

var networks = new Array();
for (var i in devices) {
	// found a network card
	if (System.getModule("com.vmware.library.vc.vm.network").isSupportedNic(devices[i])) {
		var netName = devices[i].backing.deviceName
		if (! contains(networks, netName))
			networks.push(netName);
	}
}

var ipAddresses = new Array();
if (vm.guest != null && vm.guest.ipAddress != null && vm.guest.ipAddress != "")
	ipAddresses.push(vm.guest.ipAddress);
if (vm.guest != null && vm.guest.net != null) {
	for (var i in vm.guest.net) {
		if (vm.guest.net[i] != null && vm.guest.net[i].ipAddress != null) {
			for (var j in vm.guest.net[i].ipAddress) {
				if (! contains (ipAddresses, vm.guest.net[i].ipAddress[j])) {
					ipAddresses.push(vm.guest.net[i].ipAddress[j]);
				}
			}
		}
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////
function contains(array, value) {
	for (var i in array)
		if (array[i] == value)
			return true;
	return false;
}