/**
 * Unexports Virtual Volume Set from Host Set in the selected HPE 3PAR StoreServ array.
 *
 * @param {StoreServ:Connection} connection - [object Object]
 * @param {StoreServ:VVSet} vvSet - [object Object]
 * @param {number} lun - [object Object]
 * @param {StoreServ:HostSet} hostSet - [object Object]
 * @return {boolean} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.hpe.storeserv.export").unexportVirtualVolumeSetFromHostSet(connection,vvSet,lun,hostSet) ;