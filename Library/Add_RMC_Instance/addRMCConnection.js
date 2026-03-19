/**
 * Add a connection to a HPE 3PAR StoreServ array.
 *
 * @param {string} name - [object Object]
 * @param {string} rmcSystem - [object Object]
 * @param {string} user - [object Object]
 * @param {SecureString} password - [object Object]
 * @return {string} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.hpe.rmc.connection").addRMCConnection(name,rmcSystem,user,password) ;