/**
 * @description Extracts the MAC address of the first VMXNET3 virtual network adapter found on a VM.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {VC:VirtualMachine} vcVirtualMachine - The virtual machine to inspect.
 * @returns {string} macAddressFound - The MAC address found, or an empty string if none.
 */

var vmHardwareInfo = vcVirtualMachine.config.hardware;
var devicesArrayList = vmHardwareInfo.device;
var macAddressFound = "";

var i;
for (i = 0; i < devicesArrayList.length; i++) {
    var virtualDevice = devicesArrayList[i];

    if (virtualDevice && virtualDevice instanceof VcVirtualVmxnet3) {
        System.debug("Found VMXNET3 network card: " + virtualDevice.deviceInfo.label);
        macAddressFound = virtualDevice.macAddress;
        break;
    }
}

if (!macAddressFound) {
    System.warn("No VMXNET3 adapter found for VM: " + vcVirtualMachine.name);
} else {
    System.log("MAC address of " + vcVirtualMachine.name + " is: " + macAddressFound);
}

return macAddressFound;
