// VMware vRealize Orchestrator action sample.  Valid for vRO/vRA 7.0+
//
// Add new Disk to VM
//
// Action Inputs:
// vm               VC:VirtualMachine   Virtual Machine Object
// datastore        VC:Datastore        Datastore Object on which virtual disk is to be created
// diskSizeInGB     number              Required Disk size (in GB)
// diskMode         string              Disk persistence mode.  If not provided, persistent is used as default
// thinProvisioned  boolean             Use thin provisioning?


//List of all devices on VM
var devices = vm.config.hardware.device;

var busNumberToSearch = null;
var busNumberFound = false;
var deviceKey = null;
var deviceBusNumber = null;

//Find SCSI Controller with free available device nodes
if ( devices !== null )  {
	findValidScsiController:
	for ( var ii in devices )  {
		if ( devices[ii] instanceof VcVirtualBusLogicController || devices[ii] instanceof VcVirtualLsiLogicController 
		|| devices[ii] instanceof VcParaVirtualSCSIController || devices[ii] instanceof VcVirtualLsiLogicSASController )  {
			
			deviceKey = devices[ii].key;
			deviceBusNumber = devices[ii].busNumber;
			deviceLabel = devices[ii].deviceInfo.label;
				
			System.debug("SCSI Controller Bus Number: "+deviceBusNumber);
			System.debug("SCSI Controller Label: "+deviceLabel);
			
			//Store SCSI Controller Type
			scsiControllerType = getSCSIControllerType(devices[ii]);
					
			//Find number of devices on this bus
			var controlledDevicesCount = devices[ii].device.length;
			System.debug("No. of Devices on this Bus: "+controlledDevicesCount);
			if(controlledDevicesCount < maxDeviceNodesPerController) { //Assuming numbering starts from 0
				diskControllerKey = deviceKey;
				System.log("SCSI Controller Key: "+diskControllerKey);
				System.debug( "This SCSI controller has nodes available on the Bus" );
				deviceUnitNumber = controlledDevicesCount;
				if(controlledDevicesCount >=7) {
					deviceUnitNumber++;
				}
				System.log("Next available device node number on this SCSI Controller: "+deviceUnitNumber);
				break findValidScsiController;
			} else {
				System.log("SCSI Controller (Bus Number: "+deviceBusNumber+") has reached its maximum capacity of "
							+maxDeviceNodesPerController+" devices.  Checking the next Controller ..."); 
			}
		}
	}
}

if((! diskControllerKey) || !(deviceUnitNumber >= 0)) {
	newBusNumber = deviceBusNumber+1;
	if(newBusNumber < maxScsiContollers) {
		diskControllerKey = -3;
		deviceUnitNumber = defaultNodeNumber;
		System.log("Creating a new SCSI Controller, and adding disk to the default node number "+deviceUnitNumber);
	} else {
		throw "Max. limit of number of SCSI controllers reached.  Disks CANNOT be added to this VM";
	}
}

//Specify backing information object
var backingInfo = new VcVirtualDiskFlatVer2BackingInfo();
if(! diskMode) { diskMode = "persistent"; }
backingInfo.diskMode = diskMode;
if(! datastore) { datastore = vm.datastore[0]; }
backingInfo.fileName = "[" + datastore.info.name + "]";
backingInfo.thinProvisioned = thinProvisioned;
backingInfo.writeThrough = false;

//Specify connection information for Virtual Disk
var connectInfo = new VcVirtualDeviceConnectInfo();
connectInfo.allowGuestControl = true;
connectInfo.connected = true;
connectInfo.startConnected = true;

// Create VirtualDisk Device
var disk = new VcVirtualDisk();
disk.backing = backingInfo;
disk.controllerKey = diskControllerKey;
disk.key = -2;	//Placeholder value.  Actual value assigned by server
disk.unitNumber = deviceUnitNumber;
disk.capacityInKB = parseInt( "" + (diskSizeInGB*1024*1024) );
disk.connectable = connectInfo;

// Create Disk Config Spec
var diskConfigSpec = new VcVirtualDeviceConfigSpec();
diskConfigSpec.device = disk;
diskConfigSpec.fileOperation = VcVirtualDeviceConfigSpecFileOperation.create;
diskConfigSpec.operation = VcVirtualDeviceConfigSpecOperation.add;

var controllerConfigSpec = null;
if(diskControllerKey < 0) {
	// Create SCSI Controller
	var scsiController = getSCSIControllerObject(scsiControllerType);
	scsiController.key = -3;  //Placeholder value.  Actual value assigned by server
	scsiController.controllerKey = 100;  //Placeholder value.  Actual value assigned by server
	scsiController.busNumber = newBusNumber;
	scsiController.sharedBus = VcVirtualSCSISharing.noSharing;
	
	// Create Controller Config Spec
	controllerConfigSpec = new VcVirtualDeviceConfigSpec();
	controllerConfigSpec.device = scsiController;
	controllerConfigSpec.operation = VcVirtualDeviceConfigSpecOperation.add;
}

//Specify Virtual Machine Config Spec
var vmConfigSpec = new VcVirtualMachineConfigSpec();
var deviceChanges = [];
//Add Disk Config Spec
System.log("Adding specifications for new disk to reconfiguration task");
deviceChanges.push(diskConfigSpec);
//Add Controller Config Spec
if(controllerConfigSpec) {
	System.log("Adding specifications for new SCSI controller to reconfiguration task");
	deviceChanges.push(controllerConfigSpec);
}
vmConfigSpec.deviceChange = deviceChanges;

//Launch Reconfig Task
System.log("Launching reconfiguration task ...");
var task = vm.reconfigVM_Task(vmConfigSpec);

System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(task,true,1.0) ;

function getSCSIControllerObject(controllerType) {
	var controller = null;
	switch(controllerType) {
		case "BusLogicParallel":
			controller = new VcVirtualBusLogicController();
			break;
		case "LSILogic":
			controller = new VcVirtualLsiLogicController();
			break;
		case "ParaVirtual":
			controller = new VcParaVirtualSCSIController();
			break;
		case "LSILogicSAS":
			controller = new VcVirtualLsiLogicSASController();
			break;
		default:
			throw "Unknown SCSI Controller Type";
	}
	return controller;
}

function getSCSIControllerType(controllerObject) {
	var controllerType = null;
	if ( controllerObject instanceof VcVirtualBusLogicController ) {
		controllerType = "BusLogicParallel";
	} else if ( controllerObject instanceof VcVirtualLsiLogicController ) {
		controllerType = "LSILogic";
	} else if ( controllerObject instanceof VcParaVirtualSCSIController ) {
		controllerType = "ParaVirtual";
	} else if ( controllerObject instanceof VcVirtualLsiLogicSASController ) {
		controllerType = "LSILogicSAS";
	}
	return controllerType;
}
