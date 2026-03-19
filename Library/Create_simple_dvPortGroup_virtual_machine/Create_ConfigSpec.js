/**
 * Create ConfigSpec
 *
 * @param {VC:ResourcePool} vmResourcePool
 * @param {VC:DistributedVirtualPortgroup} vmNetwork
 * @param {number} vmNbOfCpus
 * @param {string} vmName
 * @param {number} vmMemorySize
 * @param {VC:HostSystem} vmHost
 * @param {VC:VirtualMachineGuestOsIdentifier} vmGuestOs
 * @param {VC:VmFolder} vmFolder
 * @param {number} vmDiskSize
 * @param {VC:Datastore} vmDatastore
 * @return {VC:Task} task
 */
var configSpec = new VcVirtualMachineConfigSpec();
configSpec.name = vmName;
configSpec.guestId = vmGuestOs.name;
configSpec.memoryMB = vmMemorySize;
configSpec.numCPUs = vmNbOfCpus;

// Compute vmxFilePath
var datastorePath = "[" + vmDatastore.info.name + "]";
System.log( "VMX file path : '" + datastorePath + "'" );
var files = new VcVirtualMachineFileInfo();
files.vmPathName = datastorePath;
configSpec.files = files;

var deviceConfigSpecs = new Array();
var deviceConfigSpec = new VcVirtualDeviceConfigSpec();
var ii = 0;

// Add Floppy
deviceConfigSpec = System.getModule("com.vmware.library.vc.vm.spec.config.device").createVirtualFloppyRemoteConfigSpec();
deviceConfigSpecs[ii++] = deviceConfigSpec;

// Add SCSI controller
deviceConfigSpec = System.getModule("com.vmware.library.vc.vm.spec.config.device").createVirtualScsiControllerConfigSpec("LSI");
deviceConfigSpecs[ii++] = deviceConfigSpec;

// Add Disk
deviceConfigSpec = System.getModule("com.vmware.library.vc.vm.spec.config.device").createVirtualDiskFlatVer2ConfigSpec(
	vmDiskSize, vmDatastore, 0, 0, VcVirtualDiskMode.persistent, false );
deviceConfigSpecs[ii++] = deviceConfigSpec;

// Add Network

deviceConfigSpec = System.getModule("com.vmware.library.vc.vm.spec.config.device").createVirtualEthernetCardDvNetworkConfigSpec(vmNetwork );
deviceConfigSpecs[ii++] = deviceConfigSpec;

// List of devices
configSpec.deviceChange = deviceConfigSpecs;

// Launch the create VM task
task = vmFolder.createVM_Task( configSpec, vmResourcePool, vmHost );
