/**
 * Creates snapshot of given single volume
 *
 * @param {PS:Volume} volume - [object Object]
 * @param {string} suffix - [object Object]
 * @return {PS:Snapshot} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.purestorage.flasharray.snapshot").createSnapshotFromSingleVolume(volume,suffix) ;