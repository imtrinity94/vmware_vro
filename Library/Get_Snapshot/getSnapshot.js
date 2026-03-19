/**
 * Returns the details of snapshot object
 *
 * @param {string} snapshotName - [object Object]
 * @param {PS:FlashArrayConnection} flashArrayConnection - [object Object]
 * @return {PS:Snapshot} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.purestorage.flasharray.snapshot").getSnapshot(snapshotName,flashArrayConnection) ;