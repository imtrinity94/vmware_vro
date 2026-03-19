/**
 * Unregister StoreServ VASA Provider from vCenter
 *
 * @param {VC:SdkConnection} vcenter - [object Object]
 * @param {string} id - [object Object]
 * @param {string} name - [object Object]
 * @return {VC:SmsTask} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.hpe.storeserv.vasa").unregisterVasaProvider(vcenter,id,name) ;