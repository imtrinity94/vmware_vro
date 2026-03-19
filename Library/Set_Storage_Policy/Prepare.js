/**
 * Prepare
 *
 * @param {Properties} payload
 * @return {VC:VirtualMachine} vCenterVM
 * @return {Array/string} storageObjectsToBeChanged
 * @return {Array/string} storagePoliciesToBeChanged
 * @return {Array/VC:Datastore} destinationDatastores
 * @return {string} vcUserName
 * @return {number} sleepTime
 * @return {number} waitTime
 * @return {boolean} powerOffOnReconfig
 * @return {boolean} writePropertiesToIaaSServer
 * @return {vCAC:VCACHost} iaasHost
 * @return {SecureString} vcPassword
 */
if (payload == null) {
	throw "The event payload is required"
}

var machine = payload.get("machine");
if (machine == null) {
	throw "Can't find the machine information from the event payload";
}

vmProperties = machine.get("properties");
if (vmProperties == null) {
	throw "Can't extract the machine properties from the event payload";
}

// Check virtual machine type
System.log("Virtual Machine Type: " + vmProperties.get("__InterfaceType"));
if (vmProperties.get("__InterfaceType") != "vSphere") {
	throw "Only support changing storage policies for vSphere virtual machine";
}

// Find the vc instance by endpoint
var endpointId = payload.get("endpointId");
System.log("endpointId: " + endpointId);
if (endpointId == null) {
	throw "Can't find the endpoint id from the event payload";
}
var endpoints = Server.findAllForType("vCAC:Endpoint");
if (endpoints == null) {
	throw "There is no infrastructure enpoint registered on vRO";
}
var vcInstanceUuid;
for (var i in endpoints) {
    if (endpoints[i].managementEndpointID == endpointId) {
        vcInstanceUuid = endpoints[i].externalReferenceId;
        break;
    }
}
System.log("vcInstanceUuid: " + vcInstanceUuid);
if (vcInstanceUuid == null) {
	throw "Can't find the specified endpoint";
}
var host = VcPlugin.findSdkConnectionForUUID(vcInstanceUuid);
if (host == null) {
	throw "Can't find the corresponding vCenter host based on the given endpoint";
}

// Get the vCenterVM instance
var managedObjectId = machine.get("externalReference");
System.log("Managed object reference id of virtual machine: " + managedObjectId);
if (managedObjectId == null) {
	throw "Can't find the virtual machine managed reference from the event payload";
}
var foundVM = host.getAllVirtualMachines(null, "xpath:matches(id, '" + managedObjectId + "')");
if (foundVM.length == 0) {
	throw "There is no virtual machine found";
} else if (foundVM.length > 1) {
	throw "Find more then one virtual machines";
}
vCenterVM = foundVM[0];
if (vCenterVM == null) {
	throw "Can't find virtual machine";
}

// Get the storage objects and storage policies
storageObjectsToBeChanged = new Array();
storagePoliciesToBeChanged = new Array();
var vmHomePolicy = vmProperties.get("VMHomeStoragePolicy");
if (vmHomePolicy != null) {
    if (vmHomePolicy == "" || vmHomePolicy == "Datastore Default" || vmHomePolicy == "Use VM Home Storage Policy") {
        vmHomePolicy = "default";
    }
    storageObjectsToBeChanged.push("vmhome");
    storagePoliciesToBeChanged.push(vmHomePolicy);
    System.log("VM Home Storage Policy: " + vmHomePolicy);
} else {
    System.log("VM Home Storage Policy is not set");
}
var disks = System.getModule("com.vmware.library.spbm").getVMDisks(vCenterVM);
for (var i in disks) {
    var diskPolicy = vmProperties.get("VirtualMachine.Disk" + i + ".DiskStoragePolicy");
    if (diskPolicy != null) {
        if (diskPolicy == "" || diskPolicy == "Datastore Default") {
            diskPolicy = "default";
        } else if (diskPolicy == "Use VM Home Storage Policy") {
            if (vmHomePolicy == null) {
                throw "The disk " + i + " use vm home storage policy but vm home storage policy is not set";
            }
            diskPolicy = vmHomePolicy;
        }
        storageObjectsToBeChanged.push("disk" + i);
        storagePoliciesToBeChanged.push(diskPolicy);
        System.log("Disk " + i + " Storage Policy: " + diskPolicy);
    } else {
        System.log("Disk " + i + " Storage Policy is not set");
    }
}

// Get the username and password to login vc
vcUserName = vmProperties.get("spbm_vc_username");
if (vcUserName == null || vcUserName.length == 0) {
    throw "Can't get vc username";
}
vcPassword = vmProperties.get("spbm_vc_password");
if (vcPassword == null || vcPassword.length == 0) {
    throw "Can't get vc password";
}

// Get the iaas server
var iaasServer;
var hosts = Server.findAllForType("vCAC:VCACHost");
for each (var host in hosts) {
	var endpoints = host.findAllChildManagementEndpoints();
	for each (var endpoint in endpoints) {
        if (endpoint.managementEndpointID == endpointId) {
            iaasServer = host;
        }
	}
}
if (iaasServer == null) {
    throw "Can't find iaas server";
}

// Get the vm entity
var vmEntity = System.getModule("com.vmware.library.vcac").getVirtualMachineByUniqueId(iaasServer, vCenterVM.config.instanceUuid);
if (vmEntity == null) {
	throw "Can't find the virtual machine entity";
}

// Get the destination datastores
var datastoreIds = new Array();
var reservationToStoragesEntities = vmEntity.getLink(iaasServer, "HostReservation")[0].getLink(iaasServer, "HostReservationToStorages");
for each (var reservationToStorageEntity in reservationToStoragesEntities) {
    // Get host to storage entity
    var storageEntities = reservationToStorageEntity.getLink(iaasServer, "HostToStorage");
    if (storageEntities == null || storageEntities.length == 0) {
        throw "Can't find storage entity";
    } else if (storageEntities.length > 1) {
        throw "Find more than one storages entities";
    }
    // If the storage is storage cluster, get all its children
    var isStorageCluster = storageEntities[0].getProperty("IsStorageCluster"); 
    if (isStorageCluster == true) {
        var storageChildrenEntities = storageEntities[0].getLink(iaasServer, "Children");
        for each (var storageChildEntity in storageChildrenEntities) {
            datastoreIds.push(storageChildEntity.getProperties().get("ExternalReferenceId"));
        }
    } else {
        datastoreIds.push(storageEntities[0].getProperties().get("ExternalReferenceId"));
    }
}
destinationDatastores = new Array();
for each (var datastore in vCenterVM.sdkConnection.allDatastores) {
    if (datastoreIds.indexOf(datastore.id) != -1) {
        destinationDatastores.push(datastore);
    }
}
if (destinationDatastores == null || destinationDatastores.length == 0) {
	throw "There is no destination datastores defined";
}
for (var i in destinationDatastores) {
	System.log("Destination datastore " + i + ": " + destinationDatastores[i].name);
}

sleepTime = 3000;
waitTime = 5;
powerOffOnReconfig = true;
writePropertiesToIaaSServer = false;
iaasHost = null;
