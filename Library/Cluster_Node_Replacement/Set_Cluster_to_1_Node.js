/**
 * Add a note to the workflow schema.
 *
 * @param {Avi:AviVroClient} aviVroClient
 * @param {string} vmIP_Orig
 * @param {string} vmMask_Orig
 * @param {string} vmGW_Orig
 * @param {string} vmName_Orig
 * @param {string} clusterNodes_Orig
 * @param {string} cluster_Name
 * @param {string} cluster_VIP
 * @return {string} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.avi").Configure1NodeClusterCreation(aviVroClient,vmIP_Orig,vmMask_Orig,vmGW_Orig,vmName_Orig,clusterNodes_Orig,cluster_Name,cluster_VIP);
