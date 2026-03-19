/**
 * Creates a new Virtual Volume Set in the selected HPE 3PAR StoreSserv array.
 *
 * @param {StoreServ:Connection} connection - [object Object]
 * @param {string} name - [object Object]
 * @param {string} domain - [object Object]
 * @param {Array/StoreServ:Volume} virtualVolumes - [object Object]
 * @return {StoreServ:VVSet} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.hpe.storeserv.vvset").createVVSet(connection,name,domain,virtualVolumes) ;