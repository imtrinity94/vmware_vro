/**
 * Exports Virtual Volume Set to Host in the selected HPE 3PAR StoreServ array.
 *
 * @param {StoreServ:Connection} connection - [object Object]
 * @param {StoreServ:VVSet} vvSet - [object Object]
 * @param {number} lun - [object Object]
 * @param {StoreServ:Host} host - [object Object]
 * @param {boolean} autoLun - [object Object]
 * @param {string} storeservPort - [object Object]
 * @param {number} maxAutoLun - [object Object]
 * @return {Array/Properties} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.hpe.storeserv.export").exportVirtualVolumeSetToHost(connection,vvSet,lun,host,autoLun,storeservPort,maxAutoLun) ;