/**
 * Unexports Virtual Volume from Host in the selected HPE 3PAR StoreServ array.
 *
 * @param {StoreServ:Connection} connection
 * @param {StoreServ:Volume} virtualVolume
 * @param {number} lun
 * @param {string} storeservPort
 * @param {StoreServ:Host} host
 * @return {boolean} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.hpe.storeserv.export").unexportVirtualVolumeFromHost(connection,virtualVolume,lun,storeservPort,host) ;