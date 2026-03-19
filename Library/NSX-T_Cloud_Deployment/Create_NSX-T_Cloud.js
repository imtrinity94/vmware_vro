/**
 * Add a note to the workflow schema.
 *
 * @param {Avi:AviVroClient} aviVroClient
 * @param {string} nsxManager
 * @param {string} tenant_Name
 * @param {string} prefix_Name
 * @param {string} cloud_Name
 * @param {string} vCenter_Name
 * @param {string} MGMT_Data
 * @param {string} DATA_Data
 * @param {string} vCenter_Data
 * @param {boolean} mgmt_ip_scheme
 * @return {string} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.avi").CreateNSXTCloud(aviVroClient,nsxManager,tenant_Name,prefix_Name,cloud_Name,vCenter_Name,MGMT_Data,DATA_Data,vCenter_Data,mgmt_ip_scheme);
