/**
 * @description Scans all vCenter SDK connections to identify and list files belonging to
 *              all virtual machines (including snapshots). Compares these against a
 *              provided list of files (objProperties) to identify orphaned files or VMs.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {Properties} objProperties - A set of all files on datastores (keys are file paths).
 * @returns {void} Logs orphaned files and VMs to the system log.
 */

System.log("==================================================");
System.log("=============== List of All Files ================");
System.log("==================================================");

for (var i = 0; i < objProperties.length; i++) {
    var strFileName = objProperties[i];
    System.log("===== " + strFileName);
}

System.log("==================================================");

var arrVcSdkConnection = VcPlugin.allSdkConnections;
var arrAllVcVirtualMachine = new Array();
var arrOrphanedVMs = new Array();

for each (var objVcSdkConnection in arrVcSdkConnection) {
    var arrVcVirtualMachine = objVcSdkConnection.getAllVirtualMachines();
    System.log("arrVcVirtualMachine.length: " + arrVcVirtualMachine.length);
    arrAllVcVirtualMachine = arrAllVcVirtualMachine.concat(arrVcVirtualMachine);
    System.log("arrAllVcVirtualMachine.length: " + arrAllVcVirtualMachine.length);
}

System.log("FINAL arrAllVcVirtualMachine.length: " + arrAllVcVirtualMachine.length);

for each (var objVcVirtualMachine in arrAllVcVirtualMachine) {
    System.log("objVcVirtualMachine.name: " + objVcVirtualMachine.name);

    try {
        var strFileName = objVcVirtualMachine.config.files.vmPathName;

        if (objVcVirtualMachine.summary.runtime.connectionState == VcVirtualMachineConnectionState.orphaned) {
            arrOrphanedVMs.push(objVcVirtualMachine);
        }

        System.log("===== Removing File: " + strFileName);
        objProperties.remove(strFileName);
    } catch (strException) {
        try {
            System.error("Error getting files from VM '" + objVcVirtualMachine.name + "', exception : " + strException);
        } catch (strException) {
            System.error("Error getting files from VM '" + objVcVirtualMachine.id + "', exception : " + strException);
        }
        continue;
    }

    try {
        var objVcVirtualMachineConfigInfo = objVcVirtualMachine.config;
        var objVcVirtualHardware = objVcVirtualMachineConfigInfo.hardware;
        var arrVcVirtualDevice = objVcVirtualHardware.device;

        for each (var objVcVirtualDevice in arrVcVirtualDevice) {
            if (objVcVirtualDevice instanceof VcVirtualDisk) {
                try {
                    var strDiskFileName = objVcVirtualDevice.backing.fileName;
                    System.log("===== Removing File: " + strDiskFileName);
                    objProperties.remove(strDiskFileName);
                } catch (strException) {
                    try {
                        System.error("Error getting files from a disk from VM '" + objVcVirtualMachine.name + "', exception : " + strException);
                    } catch (strException) {
                        System.error("Error getting files from a disk from VM '" + objVcVirtualMachine.id + "', exception : " + strException);
                    }
                    continue;
                }
            }
        }
    } catch (strException) {
        try {
            System.error("Error getting devices from VM '" + objVcVirtualMachine.name + "', exception : " + strException);
        } catch (strException) {
            System.error("Error getting devices from VM '" + objVcVirtualMachine.id + "', exception : " + strException);
        }
        continue;
    }

    var arrSnapShots = new Array();

    if (objVcVirtualMachine.snapshot) {
        var objVcVirtualMachineSnapShotInfo = objVcVirtualMachine.snapshot;
        var arrVcVirtualMachineSnapShotTree = objVcVirtualMachineSnapShotInfo.rootSnapshotList;

        for (i in arrVcVirtualMachineSnapShotTree) {
            getSnapshotsOfVM(arrVcVirtualMachineSnapShotTree[i]);
        }
    }

    if (arrSnapShots.length > 0) {
        for each (var snapshotRef in arrSnapShots) {
            var objSnapShot = VcPlugin.convertToVimManagedObject(objVcVirtualMachine, snapshotRef);
            var objVcVirtualMachineConfigInfo = objSnapShot.config;
            var objVcVirtualHardware = objVcVirtualMachineConfigInfo.hardware;
            var arrSnapShotDevice = objVcVirtualHardware.device;

            for each (var objSnapShotDevice in arrSnapShotDevice) {
                if (objSnapShotDevice instanceof VcVirtualDisk) {
                    try {
                        var strDiskFileName = objSnapShotDevice.backing.fileName;
                        System.log("===== Removing File: " + strDiskFileName);
                        objProperties.remove(strDiskFileName);
                    } catch (strException) {
                        try {
                            System.error("Error getting files from a disk from VM '" + objVcVirtualMachine.name + "', exception : " + strException);
                        } catch (strException) {
                            System.error("Error getting files from a disk from VM '" + objVcVirtualMachine.id + "', exception : " + strException);
                        }
                        continue;
                    }
                }
            }
        }
    }
}

System.log("==================================================");
System.log("============= List of Orphaned Files =============");
System.log("==================================================");

var arrKeys = objProperties.keys;

for (var i = 0; i < arrKeys.length; i++) {
    var strKey = arrKeys[i];
    System.log("===== File Name: " + strKey);
}

System.log("==================================================");

/**
 * Recursive helper to find all snapshots of a VM.
 * @param {Object} tree - Snapshot tree node.
 */
function getSnapshotsOfVM(tree) {
    arrSnapShots.push(tree.snapshot);

    var trees = tree.childSnapshotList;

    if (trees != null) {
        for (index in trees) {
            if (trees[index] != null) {
                getSnapshotsOfVM(trees[index]);
            }
        }
    }
}

System.log("==================================================");
System.log("============== List of Orphaned VMs ==============");
System.log("==================================================");

for (var i = 0; i < arrOrphanedVMs.length; i++) {
    var strOrphanedVM = arrOrphanedVMs[i];
    System.log("===== Orphaned VM Name: " + strOrphanedVM);
}

System.log("==================================================");
