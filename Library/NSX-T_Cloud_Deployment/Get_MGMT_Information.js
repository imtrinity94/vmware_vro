/**
 * Add a note to the workflow schema.
 *
 * @param {string} nsx_cred_name
 * @param {Avi:AviVroClient} aviVroClient
 * @param {string} nsxManager
 * @param {string} mgmt_TZ
 * @param {string} mgmt_T1
 * @param {string} mgmt_Seg
 * @return {string} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.avi").GetNSXTMGMTInformation(nsx_cred_name,aviVroClient,nsxManager,mgmt_TZ,mgmt_T1,mgmt_Seg);
