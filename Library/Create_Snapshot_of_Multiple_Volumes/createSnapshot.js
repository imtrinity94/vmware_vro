/**
 * Creates snapshot of multiple volumes
 *
 * @param {Array/PS:Volume} volumes - [object Object]
 * @param {string} suffix - [object Object]
 * @param {PS:FlashArrayConnection} flashArrayConnection - [object Object]
 * @return {Array/PS:Snapshot} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.purestorage.flasharray.snapshot").createSnapshot(volumes,suffix,flashArrayConnection) ;