/**
 * Create volume for snapshot
 *
 * @param {string} name - [object Object]
 * @param {PS:Snapshot} snapshot - [object Object]
 * @param {PS:FlashArrayConnection} flashArrayConnection - [object Object]
 * @return {PS:Volume} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.purestorage.flasharray.snapshot").createVolumeFromSnapshot(name,snapshot,flashArrayConnection) ;