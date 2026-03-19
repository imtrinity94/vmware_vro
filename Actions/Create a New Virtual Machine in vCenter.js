/**
 * @description Creates a new virtual machine in vCenter with specified configuration,
 *              including SCSI controller, network interface on a distributed portgroup,
 *              thin-provisioned hard disk, and a CD-ROM backed by an ISO.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
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

var objVcDatastoreInfo = objVCDatastore.info;

var objVcVirtualMachineFileInfo = new VcVirtualMachineFileInfo();
objVcVirtualMachineFileInfo.vmPathName = "[" + objVcDatastoreInfo.name + "]";

var objVcVirtualLsiLogicSASController = new VcVirtualLsiLogicSASController();
objVcVirtualLsiLogicSASController.key = 0;
objVcVirtualLsiLogicSASController.device = new Array(0);
objVcVirtualLsiLogicSASController.busNumber = 0;
objVcVirtualLsiLogicSASController.sharedBus = VcVirtualSCSISharing.noSharing;

var objVcVirtualDeviceConfigSpecSCSI = new VcVirtualDeviceConfigSpec();
objVcVirtualDeviceConfigSpecSCSI.device = objVcVirtualLsiLogicSASController;
objVcVirtualDeviceConfigSpecSCSI.operation = VcVirtualDeviceConfigSpecOperation.add;

var objVcDVPortgroupConfigInfo = objVCDistributedVirtualPortgroup.config;

var objVcDistributedVirtualSwitch = VcPlugin.convertToVimManagedObject(objVCDistributedVirtualPortgroup, objVcDVPortgroupConfigInfo.distributedVirtualSwitch);

var objVcDistributedVirtualSwitchPortConnection = new VcDistributedVirtualSwitchPortConnection();
objVcDistributedVirtualSwitchPortConnection.switchUuid = objVcDistributedVirtualSwitch.uuid;
objVcDistributedVirtualSwitchPortConnection.portgroupKey = objVCDistributedVirtualPortgroup.key;

var objVcVirtualEthernetCardDistributedVirtualPortBackingInfo = new VcVirtualEthernetCardDistributedVirtualPortBackingInfo();
objVcVirtualEthernetCardDistributedVirtualPortBackingInfo.port = objVcDistributedVirtualSwitchPortConnection;

var objVcVirtualDeviceConnectInfo = new VcVirtualDeviceConnectInfo();
objVcVirtualDeviceConnectInfo.allowGuestControl = false;
objVcVirtualDeviceConnectInfo.connected = true;
objVcVirtualDeviceConnectInfo.startConnected = true;

var objVcVirtualVmxnet3 = new VcVirtualVmxnet3();
objVcVirtualVmxnet3.addressType = "Generated";
objVcVirtualVmxnet3.backing = objVcVirtualEthernetCardDistributedVirtualPortBackingInfo;
objVcVirtualVmxnet3.key = 0;
objVcVirtualVmxnet3.unitNumber = 0;
objVcVirtualVmxnet3.connectable = objVcVirtualDeviceConnectInfo;

var objVcVirtualDeviceConfigSpecNETWORK = new VcVirtualDeviceConfigSpec();
objVcVirtualDeviceConfigSpecNETWORK.device = objVcVirtualVmxnet3;
objVcVirtualDeviceConfigSpecNETWORK.operation = VcVirtualDeviceConfigSpecOperation.add;

var objVcVirtualDiskFlatVer2BackingInfo = new VcVirtualDiskFlatVer2BackingInfo();
objVcVirtualDiskFlatVer2BackingInfo.diskMode = VcVirtualDiskMode.persistent.value;
objVcVirtualDiskFlatVer2BackingInfo.fileName = "[" + objVcDatastoreInfo.name + "]";
objVcVirtualDiskFlatVer2BackingInfo.thinProvisioned = true;

var objVcVirtualDisk = new VcVirtualDisk();
objVcVirtualDisk.backing = objVcVirtualDiskFlatVer2BackingInfo;
objVcVirtualDisk.key = -2;
objVcVirtualDisk.controllerKey = 0;
objVcVirtualDisk.unitNumber = 0;
objVcVirtualDisk.capacityInKB = parseInt(strHardDisk) * 1024 * 1024;

var objVcVirtualDeviceConfigSpecDISK = new VcVirtualDeviceConfigSpec();
objVcVirtualDeviceConfigSpecDISK.device = objVcVirtualDisk;
objVcVirtualDeviceConfigSpecDISK.fileOperation = VcVirtualDeviceConfigSpecFileOperation.create;
objVcVirtualDeviceConfigSpecDISK.operation = VcVirtualDeviceConfigSpecOperation.add;

var objVcVirtualIDEController = new VcVirtualIDEController();
objVcVirtualIDEController.key = -1;
objVcVirtualIDEController.device = new Array(0);
objVcVirtualIDEController.busNumber = 0;

var objVcVirtualDeviceConfigSpecIDE = new VcVirtualDeviceConfigSpec();
objVcVirtualDeviceConfigSpecIDE.device = objVcVirtualIDEController;
objVcVirtualDeviceConfigSpecIDE.operation = VcVirtualDeviceConfigSpecOperation.add;

var strFilePathToISO;

if (strOperatingSystem == "Windows Server 2012 R2 ( x64 )") {
    strFilePathToISO = "Windows/Server/Windows Server 2012 R2 ( x64 ).iso";
} else if (strOperatingSystem == "RHEL v6.5 ( x64 )") {
    strFilePathToISO = "Linux/RHEL/RHEL v6.5 ( x64 ).iso";
} else if (strOperatingSystem == "CentOS v6.5 ( x64 )") {
    strFilePathToISO = "Linux/CentOS/CentOS v6.5 ( x64 ) - DVD1.iso";
} else if (strOperatingSystem == "CentOS v6.5 ( x64 ) - Minimal") {
    strFilePathToISO = "Linux/CentOS/CentOS v6.5 ( x64 ) - Minimal.iso";
} else if (strOperatingSystem == "Ubuntu v12.04.3 Server ( x86 )") {
    strFilePathToISO = "Linux/Ubuntu/Ubuntu v12.04.3 Server ( x64 ).iso";
} else if (strOperatingSystem == "Ubuntu v12.04.3 Server ( x64 )") {
    strFilePathToISO = "Linux/Ubuntu/Ubuntu v12.04.3 Server ( x64 ).iso";
}

var objVcVirtualCdromIsoBackingInfo = new VcVirtualCdromIsoBackingInfo();
objVcVirtualCdromIsoBackingInfo.fileName = "[GSWZ-InstallISOs] " + strFilePathToISO;

var objVcVirtualDeviceConnectInfoCDROM = new VcVirtualDeviceConnectInfo();
objVcVirtualDeviceConnectInfoCDROM.allowGuestControl = true;
objVcVirtualDeviceConnectInfoCDROM.connected = true;
objVcVirtualDeviceConnectInfoCDROM.startConnected = true;

var objVcVirtualCdrom = new VcVirtualCdrom();
objVcVirtualCdrom.backing = objVcVirtualCdromIsoBackingInfo;
objVcVirtualCdrom.controllerKey = 200;
objVcVirtualCdrom.key = 0;
objVcVirtualCdrom.unitNumber = 0;
objVcVirtualCdrom.connectable = objVcVirtualDeviceConnectInfoCDROM;

var objVcVirtualDeviceConfigSpecCDROM = new VcVirtualDeviceConfigSpec();
objVcVirtualDeviceConfigSpecCDROM.device = objVcVirtualCdrom;
objVcVirtualDeviceConfigSpecCDROM.operation = VcVirtualDeviceConfigSpecOperation.add;

var arrVcVirtualDeviceConfigSpec = new Array();
arrVcVirtualDeviceConfigSpec[0] = objVcVirtualDeviceConfigSpecSCSI;
arrVcVirtualDeviceConfigSpec[1] = objVcVirtualDeviceConfigSpecNETWORK;
arrVcVirtualDeviceConfigSpec[2] = objVcVirtualDeviceConfigSpecDISK;
arrVcVirtualDeviceConfigSpec[3] = objVcVirtualDeviceConfigSpecIDE;
arrVcVirtualDeviceConfigSpec[4] = objVcVirtualDeviceConfigSpecCDROM;

var objVcVirtualMachineConfigSpec = new VcVirtualMachineConfigSpec();
objVcVirtualMachineConfigSpec.name = strDataCenter + "vm" + strVirtualMachineName;
objVcVirtualMachineConfigSpec.guestId = objVCVirtualMachineGuestOsIdentifier.name;
objVcVirtualMachineConfigSpec.memoryMB = parseInt(strMemory) * 1024;
objVcVirtualMachineConfigSpec.numCPUs = parseInt(strCPU);
objVcVirtualMachineConfigSpec.files = objVcVirtualMachineFileInfo;
objVcVirtualMachineConfigSpec.deviceChange = arrVcVirtualDeviceConfigSpec;
objVcVirtualMachineConfigSpec.cpuHotAddEnabled = true;
objVcVirtualMachineConfigSpec.cpuHotRemoveEnabled = true;
objVcVirtualMachineConfigSpec.changeTrackingEnabled = true;
objVcVirtualMachineConfigSpec.memoryHotAddEnabled = true;
objVcVirtualMachineConfigSpec.version = "vmx-09";

var objVCTask = objVCVmFolder.createVM_Task(objVcVirtualMachineConfigSpec, objVCResourcePool, objVCHostSystem);

var objModuleCustom = System.getModule("com.custom");

objVCVirtualMachine = objModuleCustom.WaitTask(objVCTask);

objVCVirtualMachine.powerOnVM_Task(objVCHostSystem);
