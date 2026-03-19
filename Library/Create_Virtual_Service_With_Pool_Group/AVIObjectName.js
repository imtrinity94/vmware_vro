/**
 * AVIObjectName
 *
 * @param {Avi:WorkflowRuntime} workflowRuntime
 * @param {string} Name
 * @param {string} vsVipName
 * @return {string} HealthMonitorName
 * @return {string} poolName
 * @return {string} vsVipName
 * @return {string} Tenant
 * @return {string} poolGroupName
 */
HealthMonitorName = Name+"_HealthMonitor"
vsVipName = Name+"_vsvip"
poolName = Name+"_pool"
Tenant=workflowRuntime.getAviVroClient().cred.tenant;
poolGroupName=Name+"_pg";
System.log("HealthMonitorName : "+HealthMonitorName)


