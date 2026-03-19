/**
 * Add a note to the workflow schema.
 *
 * @param {Avi:AviVroClient} aviVroClient
 * @param {string} vcenter_cred_name
 * @param {string} content_Library
 * @param {string} nsxManager
 * @param {string} vcenter_IP
 * @param {string} DATA_Data
 * @param {string} nsx_cred_name
 * @return {string} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.avi").GetNSXTvCenterInformation(aviVroClient,vcenter_cred_name,content_Library,nsxManager,vcenter_IP,DATA_Data,nsx_cred_name);
