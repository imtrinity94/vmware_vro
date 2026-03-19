/**
 * Reconfigures a VM to generate a new MAC address for a specific NIC at the next reboot.
 * Finds the NIC matching the provided old MAC address and changes its address type to "Generated".
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {VC:VirtualMachine} vm The target vCenter VM.
 * @param {string} oldMacAddress The current MAC address that needs to be regenerated.
 * @returns {VC:Task|null} The Reconfigure VM task object, or null if no matching NIC is found.
 */

var vcTask = null;
var vmspec = new VcVirtualMachineConfigSpec();
var nicArray = new Array();
var devices = vm.config.hardware.device;

for (var i in devices) {
    if (System.getModule("com.vmware.library.vc.vm.network").isSupportedNic(devices[i])) {
        System.log("Evaluating NIC: " + devices[i].deviceInfo.summary + " (MAC: " + devices[i].macAddress + ")");
        
        if (devices[i].macAddress && devices[i].macAddress.toLowerCase() == oldMacAddress.toLowerCase()) {
            System.log("Found target NIC for regeneration.");
            var devicespec = new VcVirtualDeviceConfigSpec();
            devicespec.device = devices[i];
            devicespec.operation = VcVirtualDeviceConfigSpecOperation.edit;
            devicespec.device.addressType = "Generated";
            devicespec.device.macAddress = ""; // Clear to trigger regeneration
            nicArray.push(devicespec);
        }
    }
}

if (nicArray.length > 0) {
    vmspec.deviceChange = nicArray;
    vcTask = vm.reconfigVM_Task(vmspec);
} else {
    System.warn("No NIC found with MAC address: " + oldMacAddress);
}

return vcTask;
