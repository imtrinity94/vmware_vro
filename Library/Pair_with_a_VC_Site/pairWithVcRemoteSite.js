/**
 * pairWithVcRemoteSite
 *
 * @param {VR:Site} site
 * @param {string} localLsAddress
 * @param {string} remoteLsAddress
 * @param {string} remoteUsername
 * @param {SecureString} remotePassword
 * @param {string} remoteVcUuid
 * @return {VR:Task} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.vr.pair").pairWithVcRemoteSite(site,localLsAddress,remoteLsAddress,remoteUsername,remotePassword,remoteVcUuid) ;