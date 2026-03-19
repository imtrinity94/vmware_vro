/**
 * Adds a new Virtual Disk to a Virtual Machine.
 * Automatically identifies a SCSI controller with available nodes or creates a new one if necessary.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {VC:VirtualMachine} vm Virtual Machine Object.
 * @param {VC:Datastore} datastore Datastore Object on which virtual disk is to be created.
 * @param {number} diskSizeInGB Required Disk size (in GB).
 * @param {string} diskMode Disk persistence mode (e.g., "persistent", "nonpersistent", "independent_persistent", "independent_nonpersistent"). Defaults to "persistent".
 * @param {boolean} thinProvisioned Use thin provisioning?
 * @returns {void}
 */

var maxDeviceNodesPerController = 15;
var maxScsiControllers = 4;
var defaultNodeNumber = 0;
var diskControllerKey = null;
var deviceUnitNumber = null;
var newBusNumber = null;
var scsiControllerType = "LSILogic"; // Default if not found

// List of all devices on VM
var devicesList = vm.config.hardware.device;

// Find SCSI Controller with free available device nodes
if (devicesList !== null) {
    var ii;
    for (ii = 0; ii < devicesList.length; ii++) {
        var device = devicesList[ii];
        if (device instanceof VcVirtualBusLogicController || 
            device instanceof VcVirtualLsiLogicController || 
            device instanceof VcParaVirtualSCSIController || 
            device instanceof VcVirtualLsiLogicSASController) {
            
            var currentDeviceKey = device.key;
            var currentDeviceBusNumber = device.busNumber;
            var currentDeviceLabel = device.deviceInfo.label;
                
            System.debug("SCSI Controller Bus Number: " + currentDeviceBusNumber);
            System.debug("SCSI Controller Label: " + currentDeviceLabel);
            
            // Store SCSI Controller Type
            scsiControllerType = getSCSIControllerType(device);
                    
            // Find number of devices on this bus
            var controlledDevicesCount = device.device.length;
            System.debug("No. of Devices on this Bus: " + controlledDevicesCount);
            if (controlledDevicesCount < maxDeviceNodesPerController) { // Assuming numbering starts from 0
                diskControllerKey = currentDeviceKey;
                System.log("SCSI Controller Key: " + diskControllerKey);
                System.debug("This SCSI controller has nodes available on the Bus");
                deviceUnitNumber = controlledDevicesCount;
                if (controlledDevicesCount >= 7) {
                    deviceUnitNumber++;
                }
                System.log("Next available device node number on this SCSI Controller: " + deviceUnitNumber);
                break;
            } else {
                System.log("SCSI Controller (Bus Number: " + currentDeviceBusNumber + ") has reached its maximum capacity. Checking next..."); 
            }
        }
    }
}

if ((!diskControllerKey) || !(deviceUnitNumber >= 0)) {
    var lastBusNumberFound = -1;
    var idx;
    for (idx = 0; idx < devicesList.length; idx++) {
        var dev = devicesList[idx];
        if (dev.busNumber !== undefined && dev.busNumber > lastBusNumberFound) {
            lastBusNumberFound = dev.busNumber;
        }
    }

    newBusNumber = (lastBusNumberFound !== -1) ? lastBusNumberFound + 1 : 0;
    if (newBusNumber < maxScsiControllers) {
        diskControllerKey = -3;
        deviceUnitNumber = defaultNodeNumber;
        System.log("Creating a new SCSI Controller, and adding disk to the default node number " + deviceUnitNumber);
    } else {
        throw "Max. limit of number of SCSI controllers reached. Disks CANNOT be added to this VM";
    }
}

// Specify backing information object
var backingInfo = new VcVirtualDiskFlatVer2BackingInfo();
if (!diskMode) { diskMode = "persistent"; }
backingInfo.diskMode = diskMode;
if (!datastore) { datastore = vm.datastore[0]; }
backingInfo.fileName = "[" + datastore.info.name + "]";
backingInfo.thinProvisioned = thinProvisioned;
backingInfo.writeThrough = false;

// Specify connection information for Virtual Disk
var connectInfo = new VcVirtualDeviceConnectInfo();
connectInfo.allowGuestControl = true;
connectInfo.connected = true;
connectInfo.startConnected = true;

// Create VirtualDisk Device
var virtualDisk = new VcVirtualDisk();
virtualDisk.backing = backingInfo;
virtualDisk.controllerKey = diskControllerKey;
virtualDisk.key = -2; // Placeholder value
virtualDisk.unitNumber = deviceUnitNumber;
virtualDisk.capacityInKB = parseInt("" + (diskSizeInGB * 1024 * 1024), 10);
virtualDisk.connectable = connectInfo;

// Create Disk Config Spec
var diskConfigSpec = new VcVirtualDeviceConfigSpec();
diskConfigSpec.device = virtualDisk;
diskConfigSpec.fileOperation = VcVirtualDeviceConfigSpecFileOperation.create;
diskConfigSpec.operation = VcVirtualDeviceConfigSpecOperation.add;

var controllerConfigSpec = null;
if (diskControllerKey < 0) {
    // Create SCSI Controller
    var scsiController = getSCSIControllerObject(scsiControllerType);
    scsiController.key = -3;
    scsiController.busNumber = newBusNumber;
    scsiController.sharedBus = VcVirtualSCSISharing.noSharing;
    
    // Create Controller Config Spec
    controllerConfigSpec = new VcVirtualDeviceConfigSpec();
    controllerConfigSpec.device = scsiController;
    controllerConfigSpec.operation = VcVirtualDeviceConfigSpecOperation.add;
}

// Specify Virtual Machine Config Spec
var vmConfigSpec = new VcVirtualMachineConfigSpec();
var deviceChangesArray = [];
System.log("Adding specifications for new disk to reconfiguration task");
deviceChangesArray.push(diskConfigSpec);
if (controllerConfigSpec) {
    System.log("Adding specifications for new SCSI controller to reconfiguration task");
    deviceChangesArray.push(controllerConfigSpec);
}
vmConfigSpec.deviceChange = deviceChangesArray;

// Launch Reconfig Task
System.log("Launching reconfiguration task ...");
var reconfigTask = vm.reconfigVM_Task(vmConfigSpec);

System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(reconfigTask, true, 1.0);

return null;

/**
 * Returns the appropriate SCSI controller object based on the type string.
 */
function getSCSIControllerObject(controllerType) {
    var ctrl = null;
    switch (controllerType) {
        case "BusLogicParallel":
            ctrl = new VcVirtualBusLogicController();
            break;
        case "LSILogic":
            ctrl = new VcVirtualLsiLogicController();
            break;
        case "ParaVirtual":
            ctrl = new VcParaVirtualSCSIController();
            break;
        case "LSILogicSAS":
            ctrl = new VcVirtualLsiLogicSASController();
            break;
        default:
            throw "Unknown SCSI Controller Type: " + controllerType;
    }
    return ctrl;
}

/**
 * Determines the SCSI controller type string for a given controller object.
 */
function getSCSIControllerType(controllerObject) {
    var typeStr = null;
    if (controllerObject instanceof VcVirtualBusLogicController) {
        typeStr = "BusLogicParallel";
    } else if (controllerObject instanceof VcVirtualLsiLogicController) {
        typeStr = "LSILogic";
    } else if (controllerObject instanceof VcParaVirtualSCSIController) {
        typeStr = "ParaVirtual";
    } else if (controllerObject instanceof VcVirtualLsiLogicSASController) {
        typeStr = "LSILogicSAS";
    }
    return typeStr;
}
