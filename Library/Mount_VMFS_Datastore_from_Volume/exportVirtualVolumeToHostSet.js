/**
 * Exports Virtual Volume to Host Set in the selected HPE 3PAR StoreServ array.
 *
 * @param {StoreServ:Connection} connection - [object Object]
 * @param {StoreServ:Volume} virtualVolume - [object Object]
 * @param {number} lun - [object Object]
 * @param {StoreServ:HostSet} hostSet - [object Object]
 * @param {boolean} autoLun - [object Object]
 * @param {number} maxAutoLun - [object Object]
 * @return {Array/Properties} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.hpe.storeserv.export").exportVirtualVolumeToHostSet(connection,virtualVolume,lun,hostSet,autoLun,maxAutoLun) ;