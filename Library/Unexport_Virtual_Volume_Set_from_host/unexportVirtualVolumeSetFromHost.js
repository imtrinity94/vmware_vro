/**
 * Unexports Virtual Volume Set from Host in the selected HPE 3PAR Storeserv array.
 *
 * @param {StoreServ:Connection} connection
 * @param {StoreServ:VVSet} vvSet
 * @param {number} lun
 * @param {string} storeservPort
 * @param {StoreServ:Host} host
 * @return {boolean} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.hpe.storeserv.export").unexportVirtualVolumeSetFromHost(connection,vvSet,lun,storeservPort,host) ;