/**
 * AVIObjectName
 *
 * @param {string} Name
 * @param {string} vsVipName
 * @param {Avi:VirtualService} vs_object
 * @return {string} HealthMonitorName
 * @return {string} poolName
 * @return {string} vsVipName
 * @return {string} Tenant
 * @return {boolean} is_healthmonitor
 */

Tenant="admin"
healthMonitor = System.getModule("com.vmware.avi").getVirtualServiceDetailsString(vs_object , "healthmonitor" , "is_healthmonitor" );
System.log("HealthMonitorName actionResult: "+healthMonitor);
if (healthMonitor){
    is_healthmonitor = true;
    //HealthMonitorName = Name+"_HealthMonitor"
    //System.log("HealthMonitorName : "+HealthMonitorName);
}
existingPoolName = System.getModule("com.vmware.avi").getVirtualServiceDetailsString(vs_object , "pool" , "poolName" );
if (existingPoolName != null){
    poolName = existingPoolName
    System.log("Pool Name: "+poolName)
}
vsvipName = System.getModule("com.vmware.avi").getVirtualServiceDetailsString(vs_object , "vsvip" , "vsvipName" );
if (vsvipName != null){
    vsVipName = vsvipName
    System.log("VsVip Name: "+vsVipName)
}
