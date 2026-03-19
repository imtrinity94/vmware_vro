/**
 * Create VM
 *
 * @param {number} disk1SizeInGB
 * @param {boolean} disk1ThinProvisioned
 * @param {number} disk2SizeInGB
 * @param {boolean} disk2ThinProvisioned
 * @param {number} disk3SizeInGB
 * @param {boolean} disk3ThinProvisioned
 * @param {boolean} generateMacAddress1
 * @param {boolean} generateMacAddress2
 * @param {boolean} generateMacAddress3
 * @param {boolean} hasDisk1
 * @param {boolean} hasDisk2
 * @param {boolean} hasDisk3
 * @param {boolean} hasNetwork1
 * @param {boolean} hasNetwork2
 * @param {boolean} hasNetwork3
 * @param {string} macAddress1
 * @param {string} macAddress2
 * @param {string} macAddress3
 * @param {VC:Network} network1
 * @param {VC:Network} network2
 * @param {VC:Network} network3
 * @param {VC:Datastore} vmDatastore
 * @param {VC:VmFolder} vmFolder
 * @param {VC:VirtualMachineGuestOsIdentifier} vmGuestOs
 * @param {VC:HostSystem} vmHost
 * @param {number} vmMemorySize
 * @param {string} vmName
 * @param {number} vmNbOfCpus
 * @param {VC:ResourcePool} vmResourcePool
 * @return {VC:Task} task
 */
var configSpec = new VcVirtualMachineConfigSpec();
configSpec.name = vmName;
configSpec.guestId = vmGuestOs.name;
configSpec.memoryMB = vmMemorySize;
configSpec.numCPUs = vmNbOfCpus;

// Compute vmxFilePath
var datastorePath = "[" + vmDatastore.info.name + "]";
var files = new VcVirtualMachineFileInfo();
files.vmPathName = datastorePath;
configSpec.files = files;

var deviceConfigSpecs = new Array();
var deviceConfigSpec;
var ii = 0;

// Add Floppy
deviceConfigSpec = System.getModule("com.vmware.library.vc.vm.spec.config.device").createVirtualFloppyRemoteConfigSpec()
deviceConfigSpecs[ii++] = deviceConfigSpec;

// Add SCSI controller
deviceConfigSpec = System.getModule("com.vmware.library.vc.vm.spec.config.device").createVirtualScsiControllerConfigSpec( "LSI" );
deviceConfigSpecs[ii++] = deviceConfigSpec;

// Add Disk(s)
if ( hasDisk1 == true )  {
	deviceConfigSpec = System.getModule("com.vmware.library.vc.vm.spec.config.device").createVirtualDiskFlatVer2ConfigSpec(
		disk1SizeInGB, vmDatastore, 0, 0, VcVirtualDiskMode.persistent, disk1ThinProvisioned );
	deviceConfigSpecs[ii++] = deviceConfigSpec;
}
if ( hasDisk2 == true )  {
	deviceConfigSpec = System.getModule("com.vmware.library.vc.vm.spec.config.device").createVirtualDiskFlatVer2ConfigSpec(
		disk2SizeInGB, vmDatastore, 0, 1, VcVirtualDiskMode.persistent, disk2ThinProvisioned );
	deviceConfigSpecs[ii++] = deviceConfigSpec;
}
if ( hasDisk3 == true )  {
	deviceConfigSpec = System.getModule("com.vmware.library.vc.vm.spec.config.device").createVirtualDiskFlatVer2ConfigSpec(
		disk3SizeInGB, vmDatastore, 0, 2, VcVirtualDiskMode.persistent, disk3ThinProvisioned );
	deviceConfigSpecs[ii++] = deviceConfigSpec;
}

// Add Network(s)
if ( hasNetwork1 == true )  {
	if ( generateMacAddress1 == true )  {
		deviceConfigSpec = System.getModule("com.vmware.library.vc.vm.spec.config.device").createVirtualEthernetCardNetworkConfigSpec( network1 );
	}
	else  {
		deviceConfigSpec = System.getModule("com.vmware.library.vc.vm.spec.config.device").createVirtualEthernetCardNetworkConfigSpec( network1, macAddress1 );
	}
	deviceConfigSpecs[ii++] = deviceConfigSpec;
}
if ( hasNetwork2 == true )  {
	if ( generateMacAddress2 == true )  {
		deviceConfigSpec = System.getModule("com.vmware.library.vc.vm.spec.config.device").createVirtualEthernetCardNetworkConfigSpec( network2 );
	}
	else  {
		deviceConfigSpec = System.getModule("com.vmware.library.vc.vm.spec.config.device").createVirtualEthernetCardNetworkConfigSpec( network2, macAddress2 );
	}
	deviceConfigSpecs[ii++] = deviceConfigSpec;
}
if ( hasNetwork3 == true )  {
	if ( generateMacAddress3 == true )  {
		deviceConfigSpec = System.getModule("com.vmware.library.vc.vm.spec.config.device").createVirtualEthernetCardNetworkConfigSpec( network3 );
	}
	else  {
		deviceConfigSpec = System.getModule("com.vmware.library.vc.vm.spec.config.device").createVirtualEthernetCardNetworkConfigSpec( network3, macAddress3 );
	}
	deviceConfigSpecs[ii++] = deviceConfigSpec;
}

// List of devices
configSpec.deviceChange = deviceConfigSpecs;

// Launch the create VM task
task = vmFolder.createVM_Task( configSpec, vmResourcePool, vmHost );
