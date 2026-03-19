/**
 * createHost
 *
 * @param {StoreServ:Connection} connection
 * @param {string} name
 * @param {string} persona
 * @param {Array/string} fcpath
 * @param {Array/string} iscsipath
 * @param {string} pathType
 * @param {string} domain
 * @return {StoreServ:Host} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.hpe.storeserv.host").createHost(connection,name,persona,fcpath,iscsipath,pathType,domain) ;