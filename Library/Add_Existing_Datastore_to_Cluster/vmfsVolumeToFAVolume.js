/**
 * VC datastore correlation to FlashArray volume object
 *
 * @param {VC:Datastore} datastore - [object Object]
 * @return {PS:Volume} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.purestorage.flasharray.vmware.vcenter").vmfsVolumeToFAVolume(datastore) ;