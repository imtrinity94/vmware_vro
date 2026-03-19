/**
 * Add a note to the workflow schema.
 *
 * @param {Avi:AviVroClient} aviVroClient
 * @param {string} clusterNodes_Orig
 * @param {string} cluster_Name
 * @param {string} cluster_VIP
 * @return {string} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.avi").ConfigureClusterRecreation(aviVroClient,clusterNodes_Orig,cluster_Name,cluster_VIP);
