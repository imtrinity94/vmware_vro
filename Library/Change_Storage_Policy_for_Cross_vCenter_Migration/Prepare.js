/**
 * Prepare
 *
 * @param {VC:VirtualMachine} vcVM
 * @param {vCAC:Endpoint} destEndpoint
 * @param {string} policyName
 * @param {vCAC:VCACHost} iaasHost
 * @param {vCAC:Reservation} destReservation
 * @param {Array/VC:Datastore} destDatastores
 * @param {Array/VC:Network} destNetworks
 * @param {Array/VC:DistributedVirtualPortgroup} destDVPortgroups
 * @param {vCACCAFE:CompositeBlueprint} destBlueprint
 * @param {string} identityUser
 * @return {vCACCAFE:CatalogResource} vraVM
 * @return {string} owner
 * @return {VC:SdkConnection} destVC
 * @return {string} destVCUsername
 * @return {string} destVCSslThumbprint
 * @return {VC:ResourcePool} destResourcePool
 * @return {Array/string} storageObjects
 * @return {Array/string} storagePolicies
 * @return {Array/VC:Datastore} datastoresAttr
 * @return {Array/VC:Network} networksAttr
 * @return {Array/VC:DistributedVirtualPortgroup} dvPortgroupsAttr
 * @return {string} deploymentName
 * @return {boolean} sameVC
 * @return {string} destEncryptedVCPassword
 */
// Find destination vCenter
destVC = null;
var vcs = Server.findAllForType("VC:SdkConnection");
for each (var vc in vcs) {
	if (vc.about.instanceUuid == destEndpoint.externalReferenceId) {
        destVC = vc;
        break;
	}
}
if (destVC == null) {
    throw "Can't find dest vCenter";
}

// Get the destVC user name, password, and SSL thumbprint from endpoint properties
destVCUsername = null;
destEncryptedVCPassword = null;
destVCSslThumbprint = new String();
var sslThumbprint = null;
var entities = destEndpoint.getEntity().getLink(iaasHost, "ManagementEndpointProperties");
if (entities == null) {
    throw "Can't get the ManagementEndpointProperties from endpoint entity";
}
for each (var entity in entities) {
    if (entity.getProperty("Name") == "spbm_vc_username") {
        destVCUsername = entity.getProperty("Value");
    } else if (entity.getProperty("Name") == "spbm_vc_password") {
        destEncryptedVCPassword = entity.getProperty("Value");
    } else if (entity.getProperty("Name") == "spbm_vc_sslthumbprint") {
        sslThumbprint = entity.getProperty("Value");
    }
}
if (destVCUsername == null || destVCUsername.length == 0) {
    throw "Can't get destination vCenter username";
}
if (destEncryptedVCPassword == null || destEncryptedVCPassword.length == 0) {
    throw "Can't get destination vCenter password";
}
if (sslThumbprint == null || sslThumbprint.length == 0) {
    throw "Can't get destination vCenter ssl thumbprint";
} 
destVCSslThumbprint = sslThumbprint;
System.log("VC SSL Thumbprint: " + destVCSslThumbprint);


// Get resource pool from reservation
var rpId = destReservation.getEntity().getLink(iaasHost, "ResourcePool")[0].getProperty("ResourcePoolUniqueID");
System.log("Resource Pool ID: " + rpId);
if (rpId == null) {
    throw "Can't find resource pool id";
}
destResourcePool = destVC.getAllResourcePools(null, "xpath:matches(id, '" + rpId + "')")[0];
if (destResourcePool == null) {
    throw "Can't find resource pool";
}

// Get the disks and switches
var disks = new Array();
var sSwitches = new Array();
var dvSwitches = new Array();
var devices = vcVM.config.hardware.device;
for each (var device in devices) {
    if (device instanceof VcVirtualDisk) {
        disks.push(device);
    } else if (device instanceof VcVirtualE1000 || device instanceof VcVirtualE1000e || device instanceof VcVirtualPCNet32 || device instanceof VcVirtualVmxnet2 || device instanceof VcVirtualVmxnet3) {
        if (device.backing instanceof VcVirtualEthernetCardNetworkBackingInfo) {
            sSwitches.push(device);
        } else if (device.backing instanceof VcVirtualEthernetCardDistributedVirtualPortBackingInfo) {
            dvSwitches.push(device);
        }
    }
}

// Initialize storageObjects and storagePolicies
storageObjects = new Array();
storagePolicies = new Array();
storageObjects.push("vmhome");
storagePolicies.push(policyName);
for (var i in disks) {
    storageObjects.push("disk" + i);
    storagePolicies.push(policyName);
}

// Get destination datastores
if (destDatastores == null || destDatastores.length == 0) {
    var datastoreIds = new Array();
    var reservationToStoragesEntities = destReservation.getEntity().getLink(iaasHost, "HostReservationToStorages");
    for each (var reservationToStorageEntity in reservationToStoragesEntities) {
        // Get host to storage entity
        var storageEntities = reservationToStorageEntity.getLink(iaasHost, "HostToStorage");
        if (storageEntities == null || storageEntities.length == 0) {
            throw "Can't find storage entity";
        } else if (storageEntities.length > 1) {
            throw "Find more than one storages entities";
        }
        // If the storage is storage cluster, get all its children
        var isStorageCluster = storageEntities[0].getProperty("IsStorageCluster");         
        if (isStorageCluster == true) {
            var storageChildrenEntities = storageEntities[0].getLink(iaasHost, "Children");
            for each (var storageChildEntity in storageChildrenEntities) {
                datastoreIds.push(storageChildEntity.getProperties().get("ExternalReferenceId"));
            }
        } else {
            datastoreIds.push(storageEntities[0].getProperties().get("ExternalReferenceId"));
        }
    }
    datastoresAttr = new Array();
    for each (var datastore in destVC.allDatastores) {
        if (datastoreIds.indexOf(datastore.id) != -1) {
            datastoresAttr.push(datastore);
        }
    }
} else {
    datastoresAttr = destDatastores;
}

// Get all nices's ids
var nicIds = new Array();
var nicToReservationEntities = destReservation.getEntity().getLink(iaasHost, "HostNicToReservations");
for each (var nicToReservationEntity in nicToReservationEntities) {
    // Get host nic entity
    var nicEntities = nicToReservationEntity.getLink(iaasHost, "HostNic");
    if (nicEntities == null || nicEntities.length == 0) {
        throw "Can't find nic entity";
    } else if (nicEntities.length > 1) {
        throw "Find more than one nic entities";
    }
    nicIds.push(nicEntities[0].getProperties().get("HostNicUniqueID"));
}

// Get destination networks
if (destNetworks == null || destNetworks.length == 0) {
    if (sSwitches.length != 0) {
        destNetworks = new Array();
        for each (var network in destVC.allNetworks) {
            if (nicIds.indexOf(network.id) != -1) {
                destNetworks.push(network);
            }
        }
    }
}

// Get destination distributed virtual portgroups
if (destDVPortgroups == null || destDVPortgroups.length == 0) {
    if (dvSwitches.length != 0) {
        destDVPortgroups = new Array();
        for each (var dvPortgroup in destVC.allDistributedVirtualPortgroups) {
            if (nicIds.indexOf(dvPortgroup.id) != -1) {
                destDVPortgroups.push(dvPortgroup);
            }
        }
    }
}

// Allocate networks and dvPortgroups
networksAttr = new Array();
for (var i in sSwitches) {
    networksAttr.push(destNetworks[i % destNetworks.length]);
}
dvPortgroupsAttr = new Array();
for (var i in dvSwitches) {
    dvPortgroupsAttr.push(destDVPortgroups[i % destDVPortgroups.length]);
}

// Get the catalog resource of the vm
vraVM = null;
var vmId = System.getModule("com.vmware.library.vcac").getVirtualMachineByExternalRefId(iaasHost, vcVM.config.instanceUuid).getInventoryObject().virtualMachineID;
var resources = Server.findAllForType("VCACCAFE:CatalogResource");
for each (var resource in resources) {
    if (resource.getProviderBinding().getBindingId() == vmId) {
        vraVM = resource;
        break;
    }
}
if (vraVM == null) {
    throw "Can't find vra vm";
}

// Get the owner of the vm in vra
if (vraVM.owners == null || vraVM.owners.length == 0) {
    throw "Can't find the owner of the vm";
}
owner = vraVM.owners[0].toString();

// Initialize the deployment name
deploymentName = vcVM.name + "-migrated-" + System.getCurrentTime();

sameVC = destVC.about.instanceUuid == vcVM.sdkConnection.about.instanceUuid;