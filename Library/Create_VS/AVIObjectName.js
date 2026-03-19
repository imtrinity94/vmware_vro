/**
 * AVIObjectName
 *
 * @param {Avi:WorkflowRuntime} workflowRuntime
 * @param {string} HealthMonitorName
 * @param {string} Name
 * @param {string} poolName
 * @param {string} version
 * @param {string} CertName
 * @return {string} HealthMonitorName
 * @return {string} poolName
 * @return {string} vsVipName
 * @return {string} Tenant
 * @return {string} version
 * @return {string} CertName
 */
HealthMonitorName = Name+"_HealthMonitor"
vsVipName = Name+"_vsvip"
poolName = Name+"_pool"
CertName = Name+"_SSLCertificate"
Tenant=workflowRuntime.getAviVroClient().cred.tenant;
version=workflowRuntime.getAviVroClient().cred.version;


