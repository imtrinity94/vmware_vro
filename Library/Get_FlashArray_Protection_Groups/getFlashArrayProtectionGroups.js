/**
 * get list of all flasharray protection group.
 *
 * @param {PS:FlashArrayConnection} flashArrayConnection - [object Object]
 * @return {Array/PS:ProtectionGroup} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.purestorage.flasharray.protectiongroup").getFlashArrayProtectionGroups(flashArrayConnection) ;