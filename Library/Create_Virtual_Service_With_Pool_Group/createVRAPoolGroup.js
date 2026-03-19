/**
 * createVRAPoolGroup
 *
 * @param {Array/string} firstServerList
 * @param {string} HealthMonitorName
 * @param {number} instancePort
 * @param {string} poolGroupName
 * @param {Array/string} secondServerList
 * @param {string} ServerCloud
 * @param {string} Tenant - [object Object]
 * @param {Avi:WorkflowRuntime} workflowRuntime
 * @param {string} pool_group_uuid - [object Object]
 * @return {Avi:WorkflowRuntime} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.avi").createVRAPoolGroup(workflowRuntime,ServerCloud,Tenant,firstServerList,secondServerList,poolGroupName,instancePort,HealthMonitorName, pool_group_uuid) ;