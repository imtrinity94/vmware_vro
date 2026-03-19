/**
 * AVIObjectName
 *
 * @param {string} Name
 * @param {string} controller
 * @param {string} vsVipName
 * @param {Avi:WorkflowRuntime} workflowRuntime
 * @return {string} HealthMonitorName
 * @return {string} poolName
 * @return {string} vsVipName
 * @return {string} Tenant
 */
HealthMonitorName = Name+"_HealthMonitor"
vsVipName = Name+"_vsvip"
poolName = Name+"_pool"
Tenant=workflowRuntime.getAviVroClient().cred.tenant;
System.log("HealthMonitorName : "+HealthMonitorName)


