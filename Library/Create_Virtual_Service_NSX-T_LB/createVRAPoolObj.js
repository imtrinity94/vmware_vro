/**
 * createVRAPoolObj
 *
 * @param {Array/string} PoolServers - [object Object]
 * @param {string} poolName - [object Object]
 * @param {string} ServerCloud - [object Object]
 * @param {string} Tenant - [object Object]
 * @param {string} HealthMonitorName - [object Object]
 * @param {number} instance_port
 * @param {string} tier1_lr
 * @param {Avi:WorkflowRuntime} workflowRuntime
 * @param {string} pool_uuid - [object Object]
 * @return {Avi:WorkflowRuntime} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.avi").createVRAPoolObj(PoolServers,poolName,ServerCloud,Tenant,HealthMonitorName,workflowRuntime,instance_port,tier1_lr, pool_uuid) ;