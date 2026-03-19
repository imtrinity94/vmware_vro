/**
 * mountVVOLDS
 *
 * @param {VC:ClusterComputeResource} vccluster - [object Object]
 * @param {string} storagecontainer - [object Object]
 * @param {string} vvoldsname - [object Object]
 * @param {StoreServ:Connection} connection
 * @return {VC:Datastore} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.hpe.storeserv.vasa").mountVVOLDS(vccluster,storagecontainer,vvoldsname,connection) ;