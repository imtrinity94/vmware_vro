/**
 * Unexports Virtual Volume from Host Set in the selected HPE 3PAR StoreServ array.
 *
 * @param {StoreServ:Connection} connection - [object Object]
 * @param {StoreServ:Volume} virtualVolume - [object Object]
 * @param {number} lun - [object Object]
 * @param {StoreServ:HostSet} hostSet - [object Object]
 * @return {boolean} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.hpe.storeserv.export").unexportVirtualVolumeFromHostSet(connection,virtualVolume,lun,hostSet) ;