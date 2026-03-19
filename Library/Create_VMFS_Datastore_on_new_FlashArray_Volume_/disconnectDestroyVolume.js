/**
 * Disconnects volume if it connected to host or host groups. After disconnecting it destroys volume.
 *
 * @param {PS:Volume} volume - [object Object]
 * @param {boolean} eradicate
 * @return {string} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.purestorage.flasharray.volume").disconnectDestroyVolume(volume,eradicate) ;