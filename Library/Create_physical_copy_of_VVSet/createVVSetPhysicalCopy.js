/**
 * createVVSetPhysicalCopy
 *
 * @param {StoreServ:Connection} connection
 * @param {StoreServ:VVSet} sourceVVSet
 * @param {StoreServ:VVSet} destVVSet
 * @param {boolean} savesnapshot
 * @param {string} priority
 * @return {Array/StoreServ:Task} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.hpe.storeserv.clones").createVVSetPhysicalCopy(connection,sourceVVSet,destVVSet,savesnapshot,priority) ;