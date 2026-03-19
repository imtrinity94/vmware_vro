/**
 * Add a note to the workflow schema.
 *
 * @param {string} sdkVcenter
 * @param {string} datastore
 * @param {string} network
 * @param {string} folder
 * @param {string} Controller1_name
 * @param {string} datacenter
 * @param {string} Controller_IP_mask
 * @param {string} Controller_IP_GW
 * @param {string} controller1
 * @param {string} cluster
 * @param {string} resourcePool
 * @param {string} contentLibraryTemplate
 * @param {string} vmCPU
 * @param {string} vmRAM
 * @param {string} vmDisk
 * @return {string} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.avi").NodeDeployContentLibrary(sdkVcenter,datastore,network,folder,Controller1_name,datacenter,Controller_IP_mask,Controller_IP_GW,controller1,cluster,resourcePool,contentLibraryTemplate,vmCPU,vmRAM,vmDisk);
