/**
 * @description Creates a new hard disk and a new SCSI controller on a vCloud VM entity using
 *              RASD (Resource Allocation Setting Data) descriptors. The SCSI controller type
 *              and disk parameters are specified via input variables.
 * @note JSDoc generated via Antigravity AI IDE and can be reasonably incorrect.
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
var controllerAddressValue = nextSCSIBus;
var cimAddress = new VclCimString();
cimAddress.value = controllerAddressValue; 
scsiRasd.address = cimAddress;

var cimDescription = new VclCimString();
cimDescription.value = "SCSI Controller";
scsiRasd.description = cimDescription;

var cimElementName = new VclCimString();
cimElementName.value = "SCSI Controller " + controllerAddressValue;
scsiRasd.elementName = cimElementName;

var vclResourceType = new VclResource();
vclResourceType.value = scsiResourceType; 
scsiRasd.resourceType = vclResourceType;

var vclResourceSubType = new VclCimString();
vclResourceSubType.value = busSubType; 
scsiRasd.resourceSubType = vclResourceSubType;

var vclInstanceId = new VclCimString();
vclInstanceId.value = nextControllerInstanceId; 
scsiRasd.instanceID = vclInstanceId;

// Create a RASD instance describing the HDD
var hddRasd = new VclRASD();

var hddElementName = new VclCimString();
hddElementName.value = "Hard disk " + (nextDiskAddress + 1);
hddRasd.elementName = hddElementName;

var hddDescription = new VclCimString();
hddDescription.value = "Hard disk";
hddRasd.description = hddDescription;

var hddResourceType = new VclResource();
hddResourceType.value = diskResourceType; 
hddRasd.resourceType = hddResourceType;

var hddInstanceId = new VclCimString();
hddInstanceId.value = diskInstanceId; 
hddRasd.instanceID = hddInstanceId;

var hddParent = new VclCimString();
hddParent.value = nextControllerInstanceId; 
hddRasd.parent = hddParent;

var hddAddressOnParent = new VclCimString();
hddAddressOnParent.value = nextDiskAddress; 
hddRasd.addressOnParent = hddAddressOnParent;

var hddHostResource = new VclCimString();
hddHostResource.otherAttributes.put(VclMiscObjectFactory.createQName("capacity", "http://www.vmware.com/vcloud/v1.5", ""), diskSize + '');
hddHostResource.otherAttributes.put(VclMiscObjectFactory.createQName("busType", "http://www.vmware.com/vcloud/v1.5", ""), "6");
hddHostResource.otherAttributes.put(VclMiscObjectFactory.createQName("busSubType", "http://www.vmware.com/vcloud/v1.5", ""), busSubType);
hddRasd.hostResource.add(hddHostResource);

var disksList = entityVm.getDisks();
logModule.log("SCSI RASD: " + scsiRasd.toXml(), "debug");
var newSCSIObject = new VclVirtualDisk(scsiRasd);
disksList.push(newSCSIObject);

logModule.log("Disk RASD: " + hddRasd.toXml(), "debug");
var newDiskObject = new VclVirtualDisk(hddRasd);
disksList.push(newDiskObject);

logModule.log("Updating VM Disk Configuration", "log");
var updateTaskResult = entityVm.updateDisks(disksList);

return updateTaskResult;
