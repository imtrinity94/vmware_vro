/**
 * Disconnect detachable media
 *
 * @param {VC:VirtualMachine} vm
 * @return {VC:Task} task
 */
task = null;

// Only disconnect devices on a running VM
if ( vm.runtime.powerState == VcVirtualMachinePowerState.poweredOn )  {
	var devices = vm.config.hardware.device;
	if ( devices != null )  {

		var mustReconfig = false;
		var configSpec = new VcVirtualMachineConfigSpec();
		var deviceConfigSpecs = new Array();
		var deviceConfigSpec;

		for ( var ii in devices )  {
			var device = devices[ii];
			if ( device.connectable != null )  {
				// Only disconnect floppy, cdrom, parallel port and serial port
				if ( device instanceof VcVirtualFloppy
				  || device instanceof VcVirtualCdrom
				  || device instanceof VcVirtualParallelPort
				  || device instanceof VcVirtualSerialPort )  {
					var connectable = device.connectable;
					// Create a reconfig device spec if the device is connected
					if ( connectable.connected == true )  {
						device.connectable.connected = false;
						var deviceConfigSpec = new VcVirtualDeviceConfigSpec();
						deviceConfigSpec.device = device;
						deviceConfigSpec.operation = VcVirtualDeviceConfigSpecOperation.edit;
						deviceConfigSpecs.push( deviceConfigSpec );
						mustReconfig = true;
						System.log( "Device '" + System.getObjectClassName(device) + "' will be detached." );
					}
				}
			}
		}
		// If a "detachable" connected device was found, create a reconfigVM task
		if ( mustReconfig == true )  {
			configSpec.deviceChange = deviceConfigSpecs;
			// Launch the reconfigVM task
			task = vm.reconfigVM_Task( configSpec );
		}
		else  {
			System.log( "No detachable device is connected for VM '" + vm.name + "'" );
		}
	}
	else  {
		System.log( "No device found for VM '" + vm.name + "'" );
	}
}
else  {
	System.log( "VM '" + vm.name + "' is not poweredOn, no need to disconnect devices." );
}
