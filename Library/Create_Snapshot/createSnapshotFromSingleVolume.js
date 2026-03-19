/**
 * Creates snapshot of given volumes
 *
 * @param {string} suffix - [object Object]
 * @param {PS:Volume} volume
 * @return {PS:Snapshot} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.purestorage.flasharray.snapshot").createSnapshotFromSingleVolume(volume,suffix) ;