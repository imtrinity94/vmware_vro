/**
 * Convert independent disks
 *
 * @param {VC:VirtualMachine} vm
 * @return {VC:Task} task
 */
task = null;

// Can only convert independent disks if the VM is powered off
if ( vm.runtime.powerState != VcVirtualMachinePowerState.poweredOff )  {
	throw "VM is not powered off, cannot convert independent disks";
}

var devices = vm.config.hardware.device;
if ( devices != null )  {

	var mustReconfig = false;
	var configSpec = new VcVirtualMachineConfigSpec();
	var deviceConfigSpecs = new Array();
	var deviceConfigSpec;

	for ( var ii in devices )  {
		var device = devices[ii];

		if ( device instanceof VcVirtualDisk )  {
			var diskMode = device.backing.diskMode;
			var targetDiskMode = null;
			if ( diskMode == VcVirtualDiskMode.independent_nonpersistent.value )  {
				targetDiskMode = VcVirtualDiskMode.nonpersistent.value;
			}
			else if ( diskMode == VcVirtualDiskMode.independent_persistent.value )  {
				targetDiskMode = VcVirtualDiskMode.persistent.value;
			}
			// Create a reconfig device spec if we need to change the disk mode
			if ( targetDiskMode != null )  {
				device.backing.diskMode = targetDiskMode;
				var deviceConfigSpec = new VcVirtualDeviceConfigSpec();
				deviceConfigSpec.device = device;
				deviceConfigSpec.operation = VcVirtualDeviceConfigSpecOperation.edit;
				deviceConfigSpecs.push( deviceConfigSpec );
				mustReconfig = true;
			}
		}
	}
	// Create a reconfigVM task if needed
	if ( mustReconfig == true )  {
		// Check if the VM has some snapshots
		if ( vm.snapshot != null )  {
			throw "VM '" + vm.name + "' has at least one snapshot, cannot convert independent disks";
		}
		configSpec.deviceChange = deviceConfigSpecs;
		// Launch the reconfigVM task
		task = vm.reconfigVM_Task( configSpec );
	}
	else  {
		System.log( "No independent disk found for VM '" + vm.name + "'" );
	}
}
else  {
	System.log( "No device found for VM '" + vm.name + "'" );
}
