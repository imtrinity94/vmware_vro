/**
 * Scriptable task
 *
 * @param {Avi:VirtualService} virtualServiceObject
 */
/*************************************************************
* This script deletes Virtual service dependent objects.     *
*                                                            *
**************************************************************/
var url=virtualServiceObject.getUrl();
var tenantRef = virtualServiceObject.getTenantRef();
var controllerIp=url.substring(url.indexOf("//")+2, url.indexOf("/api"));
var aviVroClient=null;
vroClientArray=Server.findAllForType('Avi:AviVroClient','');
var clientTenant = tenantRef.substring(tenantRef.indexOf("#") + 1);
for each(vroClient in vroClientArray){
	if(vroClient !=null){
		vroController = vroClient.cred.controller;
		controllerTenant = vroClient.cred.tenant;
		if((vroController == controllerIp)&&(controllerTenant == clientTenant)){
			aviVroClient=vroClient;
		}
	}	
}
try{
	if(aviVroClient!=null)
	{		
		aviVroClient.deleteObject(virtualServiceObject, clientTenant);
		var vsVipref=virtualServiceObject.getVsvipRef();
		if(vsVipref!=null){
			var vsVipUUID = vsVipref.substring(vsVipref.indexOf("vsvip-"),vsVipref.indexOf('#'));
			System.log("VsVip Ref ::-> "+vsVipUUID)
            System.log("Provied Tenant ::-> "+ clientTenant)
            System.log("Client Tenant ::-> "+ aviVroClient.cred.tenant)
			aviVroClient.deleteObjectByUUID("vsvip",vsVipUUID, clientTenant);
		}
		var poolref=virtualServiceObject.getPoolRef();	
		if(poolref!=null){
			var poolUUID = poolref.substring(poolref.indexOf("pool-"),poolref.indexOf('#'));
			System.log("Pool Ref ::-> "+poolUUID)
            System.log("Provied Tenant ::-> "+ clientTenant)
            System.log("Client Tenant ::-> "+ aviVroClient.cred.tenant)
			aviVroClient.deleteObjectByUUID("pool",poolUUID, clientTenant)
			var poolObject = new AviPool() ;
			poolObject=aviVroClient.getObjectByUUID("pool",poolUUID, clientTenant);
			var hmArray=poolObject.getHealthMonitorRefs();
			if(hmArray!=null){
				for (i=0; i<=hmArray.length-1; i++){
					var HealthMonitor_ref = hmArray[i];
					var hmRef=virtualServiceObject.getName()+"_HealthMonitor";
					if((HealthMonitor_ref.indexOf(hmRef))!=-1){
						var hmUuid =HealthMonitor_ref.substring(HealthMonitor_ref.indexOf("/healthmonitor-")+1, HealthMonitor_ref.indexOf("#"));
						aviVroClient.deleteObjectByUUID('healthmonitor',hmUuid, clientTenant);
		
						}
					}
				}
		}
		var poolgroupref=virtualServiceObject.getPoolGroupRef();
		if(poolgroupref!=null){
			var poolGroupUUID = poolgroupref.substring(poolgroupref.indexOf('poolgroup-'),poolgroupref.indexOf('#'));
			aviVroClient.deleteObjectByUUID('poolgroup',poolGroupUUID, clientTenant)
			var poolGroupObject = new AviPoolGroup() ;
			poolGroupObject=aviVroClient.getObjectByUUID("poolgroup",poolGroupUUID, clientTenant);
			var poolArray=poolGroupObject.getMembers();
			if(poolArray!=null){
				for (i=0; i<=poolArray.length-1; i++){
					var poolMemberObject = new AviPoolGroupMember() ;
					poolMemberObject = poolArray[i];
					poolref=poolMemberObject.getPoolRef();
					if(poolref!=null){
						var poolUUID = poolref.substring(poolref.indexOf('pool-'),poolref.indexOf('#'));
						aviVroClient.deleteObjectByUUID('pool',poolUUID, clientTenant);
						}
					}
					if(poolref!=null){
					var poolUUID = poolref.substring(poolref.indexOf('pool-'),poolref.indexOf('#'));
					var poolObject = new AviPool() ;
					poolObject=aviVroClient.getObjectByUUID("pool",poolUUID, clientTenant);
					var hmArray=poolObject.getHealthMonitorRefs();
					if(hmArray!=null){
						for (i=0; i<=hmArray.length-1; i++){
							var HealthMonitor_ref = hmArray[i];
							var hmRef=virtualServiceObject.getName()+"_HealthMonitor";
							if((HealthMonitor_ref.indexOf(hmRef))!=-1){
								var hmUuid =HealthMonitor_ref.substring(HealthMonitor_ref.indexOf("/healthmonitor-")+1, HealthMonitor_ref.indexOf("#"));
								aviVroClient.deleteObjectByUUID('healthmonitor',hmUuid, clientTenant);
							}
						}
					}
				}
			}
		}
		aviVroClient.executeWorkflow();
		System.log("Vs deleted successfully.");
	}
}catch(e){
	System.log("Error occured while deleting object : "+e)
}
