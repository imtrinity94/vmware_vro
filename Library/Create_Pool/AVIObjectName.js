/**
 * AVIObjectName
 *
 * @param {string} Name - [object Object]
 * @param {string} HealthMonitorName
 * @param {string} version
 * @param {Avi:WorkflowRuntime} workflowRuntime
 * @return {string} HealthMonitorName
 * @return {string} Tenant
 * @return {string} version
 */
HealthMonitorName = Name+"_HealthMonitor"
Tenant=workflowRuntime.getAviVroClient().cred.tenant
version=workflowRuntime.getAviVroClient().cred.version


