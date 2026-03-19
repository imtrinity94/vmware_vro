/**
 * @description Creates a new hard disk and a new SCSI controller on a vCloud VM entity using
 *              RASD (Resource Allocation Setting Data) descriptors. The SCSI controller type
 *              and disk parameters are specified via input variables.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {VclVM} entityVm - The vCloud VM entity to add the SCSI controller and disk to.
 * @param {number} nextSCSIBus - The hardware bus address of the new SCSI controller.
 * @param {number} scsiResourceType - The RASD resource type for SCSI controller (typically 6).
 * @param {string} busSubType - The SCSI subtype (e.g., "lsilogic", "lsilogicsas", "VirtualSCSI").
 * @param {string} nextControllerInstanceId - The instance ID for the new SCSI controller.
 * @param {number} diskResourceType - The RASD resource type for the disk (typically 17).
 * @param {string} diskInstanceId - The instance ID for the new disk.
 * @param {number} nextDiskAddress - The LUN/address of the new disk on the SCSI controller.
 * @param {number} diskSize - The size of the new disk in GB.
 * @param {*} logModule - Logging module providing log() method.
 * @returns {VclTask} updateDiskTask - The vCloud task for the disk update operation.
 */

// Create a RASD instance describing the SCSI Controller
var scsiRasd = new VclRASD();
var controllerAddress = nextSCSIBus;
var address = new VclCimString();
address.value = controllerAddress; // the hardware address of the controller in the controller RASD, null in Disk RASD
scsiRasd.address = address;

var elementDescription = new VclCimString();
elementDescription.value = "SCSI Controller";
scsiRasd.description = elementDescription;

var elementName = new VclCimString();
elementName.value = "SCSI Controller " + controllerAddress;
scsiRasd.elementName = elementName;

var resourceType = new VclResource();
resourceType.value = scsiResourceType; // Resource Type 6 = SCSI controller, 17 = disk
scsiRasd.resourceType = resourceType;

var resourceSubType = new VclCimString();
resourceSubType.value = busSubType; // Resource Sub Type = the SCSI type: lsilogic, lsilogicsas, or VirtualSCSI
scsiRasd.resourceSubType = resourceSubType;

var instanceId = new VclCimString();
instanceId.value = nextControllerInstanceId; // the instanceId of the SCSI Controller
scsiRasd.instanceID = instanceId;

// Create a RASD instance describing the HDD
var rasd = new VclRASD();

var elementName = new VclCimString();
elementName.value = "Hard disk " + (nextDiskAddress + 1);
rasd.elementName = elementName;

var elementDescription = new VclCimString();
elementDescription.value = "Hard disk";
rasd.description = elementDescription;

var resourceType = new VclResource();
resourceType.value = diskResourceType; // Resource Type 6 = SCSI controller, 17 = disk
rasd.resourceType = resourceType;

var instanceId = new VclCimString();
instanceId.value = diskInstanceId; // the instanceId of the disk, doesn't seem to matter it will find one
rasd.instanceID = instanceId;

var elementParent = new VclCimString();
elementParent.value = nextControllerInstanceId; // the instanceID of the controller
rasd.parent = elementParent;

var elementAddressOnParent = new VclCimString();
elementAddressOnParent.value = nextDiskAddress; // the LUN of the disk
rasd.addressOnParent = elementAddressOnParent;

var elementHostResource = new VclCimString();
elementHostResource.otherAttributes.put(VclMiscObjectFactory.createQName("capacity", "http://www.vmware.com/vcloud/v1.5", ""), diskSize + '');
elementHostResource.otherAttributes.put(VclMiscObjectFactory.createQName("busType", "http://www.vmware.com/vcloud/v1.5", ""), "6");
elementHostResource.otherAttributes.put(VclMiscObjectFactory.createQName("busSubType", "http://www.vmware.com/vcloud/v1.5", ""), busSubType);
rasd.hostResource.add(elementHostResource);

var disks = entityVm.getDisks();
logModule.log(scsiRasd.toXml(), "debug");
var newSCSI = new VclVirtualDisk(scsiRasd);
disks.push(newSCSI);
logModule.log(rasd.toXml(), "debug");
var newDisk = new VclVirtualDisk(rasd);
disks.push(newDisk);

logModule.log("Updating VM Disk Configuration", "log");
updateDiskTask = entityVm.updateDisks(disks);
