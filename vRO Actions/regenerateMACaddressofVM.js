// VMware vRealize Orchestrator action sample
//
// Reconfigures a VM so that it generates a new MAC address at the next reboot
// Returns null if no matching MAC address was found on the VM
// 
// For vRO 7.0+/vCenter 6.0+
//
// Action Inputs:
// vm - VC:VirtualMachine - vCenter VM
// oldMacAddress - string - Current MAC address that needs regeneration
//
// Return type: VC:Task - the Reconfigure VM task in vCenter


// ------- ReconfigVM_Task -------
var vcTask;
var vmspec = new VcVirtualMachineConfigSpec(); // Builds config spec object for VirtualMachine
var nicArray = new Array(); // Array holds each of the nic configurations (devicespecs)
var devicespec = new VcVirtualDeviceConfigSpec();
var devices = vm.config.hardware.device;
//var actualPos = 0;
for( var i in devices){
	if (System.getModule("com.vmware.library.vc.vm.network").isSupportedNic(devices[i])) {
	    System.log("NIC device summary: '"+devices[i].deviceInfo.summary+"'");
		System.log("   Current MAC address: " + devices[i].macAddress);
		if (devices[i].macAddress == oldMacAddress) {
			deviceKey = devices[i].key;
			devicespec.device = devices[i];
			devicespec.operation = VcVirtualDeviceConfigSpecOperation.edit;
			devicespec.device.addressType = "Generated";
			devicespec.device.macAddress = "";
			nicArray.push(devicespec);
		}
  }
}

if (nicArray.length != 0) {
	vmspec.deviceChange = nicArray;
	vcTask = vm.reconfigVM_Task(vmspec);
}

return vcTask;
