/**
 * AVIObjectName
 *
 * @param {string} Name
 * @param {string} controller
 * @param {string} vsVipName
 * @return {string} HealthMonitorName
 * @return {string} poolName
 * @return {string} vsVipName
 * @return {string} Tenant
 */
HealthMonitorName = Name+"_HealthMonitor"
vsVipName = Name+"_vsvip"
poolName = Name+"_pool"
Tenant="admin"
System.log("HealthMonitorName : "+HealthMonitorName)


