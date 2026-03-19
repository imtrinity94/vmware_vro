/**
 * Prepare
 *
 * @param {string} policyName
 * @param {string} option
 * @param {number} diskNum
 * @param {vCAC:VCACHost} iaasHost
 * @param {VC:VirtualMachine} vcVM
 * @param {Array/VC:Datastore} destDatastores
 * @return {Array/string} storageObjectsToBeChanged
 * @return {Array/string} storagePoliciesToBeChanged
 * @return {Array/VC:Datastore} destinationDatastores
 * @return {string} vcUserName
 * @return {number} sleepTime
 * @return {number} waitTime
 * @return {boolean} powerOffOnReconfig
 * @return {boolean} writePropertiesToIaaSServer
 * @return {vCAC:VCACHost} iaasServer
 * @return {string} encryptedVcPassword
 */
// If not specify iaasHost, try to find the unique iaasHost
if (iaasHost == null) {
    var iaasHosts = Server.findAllForType("vCAC:VCACHost");
    if (iaasHosts != null && iaasHosts.length == 1) {
        iaasServer = iaasHosts[0];
        System.warn("IaaSHost is not set");
    } else {
        throw "IaaSHost is mandatory";
    }
} else {
    iaasServer = iaasHost;
}

// Get the storage objects and storage policies
storageObjectsToBeChanged = new Array();
storagePoliciesToBeChanged = new Array();
if (policyName == null || policyName == "" || policyName == "Datastore Default") {
    policyName = "default";
}
var disks = System.getModule("com.vmware.library.spbm").getVMDisks(vcVM);
switch (option) {
    case "Just VM Home":
        storageObjectsToBeChanged.push("vmhome");
        storagePoliciesToBeChanged.push(policyName);
        break;

    case "Just Disks":
        for (var i in disks) {
            storageObjectsToBeChanged.push("disk" + i);
            storagePoliciesToBeChanged.push(policyName);
        }
        break;

    case "Single Disk":
        storageObjectsToBeChanged.push("disk" + diskNum);
        storagePoliciesToBeChanged.push(policyName);
        break;

    default:
        storageObjectsToBeChanged.push("vmhome");
        storagePoliciesToBeChanged.push(policyName);
        for (var i in disks) {
            storageObjectsToBeChanged.push("disk" + i);
            storagePoliciesToBeChanged.push(policyName);
        }
        break;
}

// Get the vm entity
var vmEntity = System.getModule("com.vmware.library.vcac").getVirtualMachineByUniqueId(iaasServer, vcVM.config.instanceUuid);
if (vmEntity == null) {
	throw "Can't find the virtual machine entity";
}

// Get the vm interface type in vm properties
var vmPropertiesEntities = vmEntity.getLink(iaasServer, "VirtualMachineProperties");
if (vmPropertiesEntities == null) {
	throw "Can't get the virtual machine's properties";
}
var interfaceType;
for each (var propertyEntity in vmPropertiesEntities) {
	if (propertyEntity.getProperty("PropertyName") == "__InterfaceType") {
        interfaceType = propertyEntity.getProperty("PropertyValue");
	}
}
System.log("Virtual machine interface type: " + interfaceType);
if (interfaceType == null) {
    throw "Can't get the virtual machine type";
} else if (interfaceType != "vSphere") {
    throw "Only support changing storage policies for vSphere virtual machine";
}

// Get the destination datastores
if (destDatastores != null && destDatastores.length != 0) {
    destinationDatastores = destDatastores;
} else {
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
    for each (var datastore in vcVM.sdkConnection.allDatastores) {
        if (datastoreIds.indexOf(datastore.id) != -1) {
            destinationDatastores.push(datastore);
        }
    }
}
for (var i in destinationDatastores) {
    System.log("Destination datastore " + i + ": " + destinationDatastores[i].name);
}

// Get the VC user name and password from endpoint properties
var vCenterUuid = vcVM.sdkConnection.about.instanceUuid;
var endpoints = Server.findAllForType("vCAC:Endpoint");
if (endpoints == null) {
	throw "There is no infrastructure enpoint registered on vRO";
}
for each (var endpoint in endpoints) {
    if (endpoint.externalReferenceId == vCenterUuid) {
        var entities = endpoint.getEntity().getLink(iaasServer, "ManagementEndpointProperties");
        if (entities == null) {
            System.log("Can't get the ManagementEndpointProperties");
            continue;
        }
        for each (var entity in entities) {
            if (entity.getProperty("Name") == "spbm_vc_username") {
                vcUserName = entity.getProperty("Value");
            } else if (entity.getProperty("Name") == "spbm_vc_password") {
                encryptedVcPassword = entity.getProperty("Value");
            }
        }
        if (vcUserName != null && vcUserName.length != 0 && encryptedVcPassword != null && encryptedVcPassword.length != 0) {
            break;
        }
    }
}
if (vcUserName == null || vcUserName.length == 0 || encryptedVcPassword == null || encryptedVcPassword.length == 0) {
    throw "Can't get username or password to login vCenter";
}

sleepTime = 3000;
waitTime = 5;
powerOffOnReconfig = false;
writePropertiesToIaaSServer = true;
