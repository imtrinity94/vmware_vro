/**
 * Overwrite RDM with Snapshot
 *
 * @param {PS:Volume} rdmVolToOverwrite
 * @param {PS:Snapshot} sourceSnapshot - [object Object]
 * @return {PS:Volume} overriddenRDM
 */
overriddenRDM = overriddenRDM = System.getModule("com.purestorage.flasharray.volume").overwriteVolume(rdmVolToOverwrite, sourceSnapshot.name);