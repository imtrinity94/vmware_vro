/**
 * @description Scans all vCenter SDK connections to identify and list files belonging to
 *              all virtual machines (including snapshots). Compares these against a
 *              provided list of files (discoveryMap) to identify orphaned files or VMs.
 * @note JSDoc generated via Antigravity AI IDE and can be reasonably incorrect.
 *
 * @param {Properties} discoveryMap - A set of all files on datastores (keys are file paths).
 * @returns {void}
 */

var discoveryFileKeys = discoveryMap.keys;
System.log("Processing " + discoveryFileKeys.length + " files from datastore discovery...");

var i;
for (i = 0; i < discoveryFileKeys.length; i++) {
    System.debug("Discovery File: " + discoveryFileKeys[i]);
}

var sdkConnectionsList = VcPlugin.allSdkConnections;
var consolidatedVmsList = [];
var orphanedVmsList = [];

var j;
for (j = 0; j < sdkConnectionsList.length; j++) {
    var sdkConn = sdkConnectionsList[j];
    var vmsInConn = sdkConn.getAllVirtualMachines();
    consolidatedVmsList = consolidatedVmsList.concat(vmsInConn);
}

System.log("Total Virtual Machines to scan: " + consolidatedVmsList.length);

var k;
for (k = 0; k < consolidatedVmsList.length; k++) {
    var vmObj = consolidatedVmsList[k];
    
    try {
        var vmPath = vmObj.config.files.vmPathName;

        if (vmObj.summary.runtime.connectionState == VcVirtualMachineConnectionState.orphaned) {
            orphanedVmsList.push(vmObj);
        }

        System.debug("Removing matched VM config file: " + vmPath);
        discoveryMap.remove(vmPath);
    } catch (vmEx) {
        System.error("Failed to process basic files for VM (ID: " + vmObj.id + "): " + vmEx);
        continue;
    }

    // Process Virtual Disks
    try {
        var vmDevicesList = vmObj.config.hardware.device;
        var l;
        for (l = 0; l < vmDevicesList.length; l++) {
            var deviceItem = vmDevicesList[l];
            if (deviceItem instanceof VcVirtualDisk) {
                try {
                    var diskPath = deviceItem.backing.fileName;
                    System.debug("Removing matched virtual disk: " + diskPath);
                    discoveryMap.remove(diskPath);
                } catch (diskEx) {
                    System.warn("Failed to retrieve disk backing for VM: " + vmObj.name);
                }
            }
        }
    } catch (hwEx) {
        System.error("Failed to process hardware for VM: " + vmObj.name);
    }

    // Process Snapshots
    if (vmObj.snapshot) {
        var rootSnapshotsArray = vmObj.snapshot.rootSnapshotList;
        var m;
        for (m = 0; m < rootSnapshotsArray.length; m++) {
            var currentVmsSnapshots = []; // This needs to be local or managed globally if recursive
            extractSnapshotsRecursively(rootSnapshotsArray[m], currentVmsSnapshots);
            
            var n;
            for (n = 0; n < currentVmsSnapshots.length; n++) {
                var snapRef = currentVmsSnapshots[n];
                var snapObj = VcPlugin.convertToVimManagedObject(vmObj, snapRef);
                var snapDevicesList = snapObj.config.hardware.device;
                
                var o;
                for (o = 0; o < snapDevicesList.length; o++) {
                    var snapDeviceItem = snapDevicesList[o];
                    if (snapDeviceItem instanceof VcVirtualDisk) {
                        var snapDiskPath = snapDeviceItem.backing.fileName;
                        System.debug("Removing matched snapshot disk: " + snapDiskPath);
                        discoveryMap.remove(snapDiskPath);
                    }
                }
            }
        }
    }
}

System.log("--- Scanning Complete ---");

var remainingFileKeys = discoveryMap.keys;
System.log("Found " + remainingFileKeys.length + " ORPHANED Files:");
var p;
for (p = 0; p < remainingFileKeys.length; p++) {
    System.log("ORPHANED FILE -> " + remainingFileKeys[p]);
}

System.log("Found " + orphanedVmsList.length + " ORPHANED Virtual Machines:");
var q;
for (q = 0; q < orphanedVmsList.length; q++) {
    System.log("ORPHANED VM -> " + orphanedVmsList[q].name);
}

return null;

/**
 * Recursive helper to find all snapshots of a VM.
 */
function extractSnapshotsRecursively(snapTreeNode, resultsList) {
    resultsList.push(snapTreeNode.snapshot);
    var childSnaps = snapTreeNode.childSnapshotList;
    if (childSnaps != null) {
        var idx;
        for (idx = 0; idx < childSnaps.length; idx++) {
            if (childSnaps[idx] != null) {
                extractSnapshotsRecursively(childSnaps[idx], resultsList);
            }
        }
    }
}
