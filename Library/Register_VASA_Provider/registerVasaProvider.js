/**
 * Register StoreServ VASA Provider
 *
 * @param {StoreServ:Connection} connection
 * @param {VC:SdkConnection} vcenter
 * @param {string} name
 * @param {string} user
 * @param {SecureString} password
 * @param {string} cert
 * @param {string} url
 * @return {VC:SmsTask} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.hpe.storeserv.vasa").registerVasaProvider(connection,vcenter,name,user,password,cert,url) ;