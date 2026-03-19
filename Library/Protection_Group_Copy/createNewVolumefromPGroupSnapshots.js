/**
 * Retuens new volume objects crearted from the snapshots of the protection group snapshot specified.
 *
 * @param {PS:FlashArrayConnection} flashArrayConnection - [object Object]
 * @param {PS:ProtectionGroupSnapshot} pGroupSnapshot - [object Object]
 * @param {string} Suffix - [object Object]
 * @return {Array/PS:Volume} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.purestorage.flasharray.protectiongroupsnapshot").createNewVolumefromPGroupSnapshots(flashArrayConnection,pGroupSnapshot,Suffix) ;