/**
 * Add a note to the workflow schema.
 *
 * @param {string} data_TZ
 * @param {string} data_T1
 * @param {string} data_Seg
 * @param {string} nsxManager
 * @param {Avi:AviVroClient} aviVroClient
 * @param {string} nsx_cred_name
 * @return {string} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.avi").GetNSXTDataInformation(data_TZ,data_T1,data_Seg,nsxManager,aviVroClient,nsx_cred_name);
