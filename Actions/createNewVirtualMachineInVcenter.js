/**
 * @description Creates a new virtual machine in vCenter with specified configuration,
 *              including SCSI controller, network interface on a distributed portgroup,
 *              thin-provisioned hard disk, and a CD-ROM backed by an ISO.
 * @note JSDoc generated via Antigravity AI IDE and can be reasonably incorrect.
 *
 * @param {VC:Datastore} objVCDatastore - Target datastore for VM files.
 * @param {VC:DistributedVirtualPortgroup} objVCDistributedVirtualPortgroup - Target network portgroup.
 * @param {string} strHardDisk - Hard disk size in GB.
 * @param {string} strOperatingSystem - OS name used to select the ISO path.
 * @param {VC:VmGuestOsIdentifier} objVCVirtualMachineGuestOsIdentifier - Guest OS ID for the VM.
 * @param {string} strDataCenter - Datacenter prefix for the VM name.
 * @param {string} strVirtualMachineName - Base name for the VM.
 * @param {string} strMemory - Memory size in GB.
 * @param {string} strCPU - Number of CPUs.
 * @param {VC:VmFolder} objVCVmFolder - Target VM folder.
 * @param {VC:ResourcePool} objVCResourcePool - Target resource pool.
 * @param {VC:HostSystem} objVCHostSystem - Target host system.
 * @returns {VC:VirtualMachine} The created and powered-on virtual machine.
 */

var datastoreName = objVCDatastore.info.name;

var vmFileInfo = new VcVirtualMachineFileInfo();
vmFileInfo.vmPathName = "[" + datastoreName + "]";

var lsiSasController = new VcVirtualLsiLogicSASController();
lsiSasController.key = 0;
lsiSasController.device = [];
lsiSasController.busNumber = 0;
lsiSasController.sharedBus = VcVirtualSCSISharing.noSharing;

var scsiConfigSpec = new VcVirtualDeviceConfigSpec();
scsiConfigSpec.device = lsiSasController;
scsiConfigSpec.operation = VcVirtualDeviceConfigSpecOperation.add;

var dvpgConfig = objVCDistributedVirtualPortgroup.config;
var dvSwitch = VcPlugin.convertToVimManagedObject(objVCDistributedVirtualPortgroup, dvpgConfig.distributedVirtualSwitch);

var dvPortConnection = new VcDistributedVirtualSwitchPortConnection();
dvPortConnection.switchUuid = dvSwitch.uuid;
dvPortConnection.portgroupKey = objVCDistributedVirtualPortgroup.key;

var dvPortBacking = new VcVirtualEthernetCardDistributedVirtualPortBackingInfo();
dvPortBacking.port = dvPortConnection;

var nicConnectInfo = new VcVirtualDeviceConnectInfo();
nicConnectInfo.allowGuestControl = false;
nicConnectInfo.connected = true;
nicConnectInfo.startConnected = true;

var vmxnet3Adapter = new VcVirtualVmxnet3();
vmxnet3Adapter.addressType = "Generated";
vmxnet3Adapter.backing = dvPortBacking;
vmxnet3Adapter.key = 0;
vmxnet3Adapter.unitNumber = 0;
vmxnet3Adapter.connectable = nicConnectInfo;

var nicConfigSpec = new VcVirtualDeviceConfigSpec();
nicConfigSpec.device = vmxnet3Adapter;
nicConfigSpec.operation = VcVirtualDeviceConfigSpecOperation.add;

var diskBacking = new VcVirtualDiskFlatVer2BackingInfo();
diskBacking.diskMode = VcVirtualDiskMode.persistent.value;
diskBacking.fileName = "[" + datastoreName + "]";
diskBacking.thinProvisioned = true;

var virtualDisk = new VcVirtualDisk();
virtualDisk.backing = diskBacking;
virtualDisk.key = -2;
virtualDisk.controllerKey = 0;
virtualDisk.unitNumber = 0;
virtualDisk.capacityInKB = parseInt(strHardDisk, 10) * 1024 * 1024;

var diskConfigSpec = new VcVirtualDeviceConfigSpec();
diskConfigSpec.device = virtualDisk;
diskConfigSpec.fileOperation = VcVirtualDeviceConfigSpecFileOperation.create;
diskConfigSpec.operation = VcVirtualDeviceConfigSpecOperation.add;

var ideController = new VcVirtualIDEController();
ideController.key = -1;
ideController.device = [];
ideController.busNumber = 0;

var ideConfigSpec = new VcVirtualDeviceConfigSpec();
ideConfigSpec.device = ideController;
ideConfigSpec.operation = VcVirtualDeviceConfigSpecOperation.add;

var isoFilePath = "";
var osName = strOperatingSystem;
if (osName.indexOf("Windows Server 2012 R2") !== -1) {
    isoFilePath = "Windows/Server/Windows Server 2012 R2 ( x64 ).iso";
} else if (osName.indexOf("RHEL v6.5") !== -1) {
    isoFilePath = "Linux/RHEL/RHEL v6.5 ( x64 ).iso";
} else if (osName.indexOf("CentOS v6.5") !== -1) {
    isoFilePath = "Linux/CentOS/CentOS v6.5 ( x64 ) - DVD1.iso";
} else if (osName.indexOf("Ubuntu v12.04.3") !== -1) {
    isoFilePath = "Linux/Ubuntu/Ubuntu v12.04.3 Server ( x64 ).iso";
}

var cdromBacking = new VcVirtualCdromIsoBackingInfo();
cdromBacking.fileName = "[GSWZ-InstallISOs] " + isoFilePath;

var cdromConnectInfo = new VcVirtualDeviceConnectInfo();
cdromConnectInfo.allowGuestControl = true;
cdromConnectInfo.connected = true;
cdromConnectInfo.startConnected = true;

var virtualCdrom = new VcVirtualCdrom();
virtualCdrom.backing = cdromBacking;
virtualCdrom.controllerKey = 200;
virtualCdrom.key = 0;
virtualCdrom.unitNumber = 0;
virtualCdrom.connectable = cdromConnectInfo;

var cdromConfigSpec = new VcVirtualDeviceConfigSpec();
cdromConfigSpec.device = virtualCdrom;
cdromConfigSpec.operation = VcVirtualDeviceConfigSpecOperation.add;

var deviceChanges = [scsiConfigSpec, nicConfigSpec, diskConfigSpec, ideConfigSpec, cdromConfigSpec];

var vmConfigSpec = new VcVirtualMachineConfigSpec();
vmConfigSpec.name = strDataCenter + "vm" + strVirtualMachineName;
vmConfigSpec.guestId = objVCVirtualMachineGuestOsIdentifier.name;
vmConfigSpec.memoryMB = parseInt(strMemory, 10) * 1024;
vmConfigSpec.numCPUs = parseInt(strCPU, 10);
vmConfigSpec.files = vmFileInfo;
vmConfigSpec.deviceChange = deviceChanges;
vmConfigSpec.cpuHotAddEnabled = true;
vmConfigSpec.cpuHotRemoveEnabled = true;
vmConfigSpec.changeTrackingEnabled = true;
vmConfigSpec.memoryHotAddEnabled = true;
vmConfigSpec.version = "vmx-09";

var createVmTask = objVCVmFolder.createVM_Task(vmConfigSpec, objVCResourcePool, objVCHostSystem);
var customWaitModule = System.getModule("com.custom");
var createdVm = customWaitModule.WaitTask(createVmTask);

createdVm.powerOnVM_Task(objVCHostSystem);

return createdVm;
