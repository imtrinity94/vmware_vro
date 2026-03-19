/**
 * Revert machine snapshot
 *
 * @param {VRA:Snapshot} snapshot
 * @return {VRA:RequestTracker} requestTracker
 */
var snapshotSID = snapshot.internalIdString;
var snapshotSIDArray = snapshotSID.split(",");

if(snapshotSIDArray.length!= 3){
    System.log("Invalid Snapshot SID : "+ snapshotSID);
    throw new Error("Invalid Snapshot ID");
}

var machineKey = snapshotSIDArray[1];
var snapshotKey = snapshotSIDArray[2];

var machineId = machineKey.split(":")[1];
var snapshotId = snapshotKey.split(":")[1];

var machineService = snapshot.host.createInfrastructureClient().createMachineService();
requestTracker = machineService.revertMachineSnapshot(machineId, snapshotId);

System.log("Revert machine snapshot request for machine - " + machineId + " has been successfully placed with request tracker id " + requestTracker.id);