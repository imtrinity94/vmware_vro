/**
 * createVolume
 *
 * @param {string} name
 * @param {StoreServ:Connection} storeservconnection
 * @param {StoreServ:CPG} cpg
 * @param {number} sizeMiB
 * @param {boolean} tpvv
 * @param {boolean} tdvv
 * @param {boolean} compression
 * @return {StoreServ:Volume} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.hpe.storeserv.volume").createVolume(name,storeservconnection,cpg,sizeMiB,tpvv,tdvv,compression) ;