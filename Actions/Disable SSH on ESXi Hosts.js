var arrVcHostSystem;
	arrVcHostSystem = objVcSdkConnection.getAllHostSystems(null, null);
	
for ( var i = 0; i < arrVcHostSystem.length; i++ )
{
	var objVcHostSystem;
		objVcHostSystem = arrVcHostSystem[i];
		
	var objVcHostConfigManager;
		objVcHostConfigManager = objVcHostSystem.configManager;
		
	var objVcHostServiceSystem;
		objVcHostServiceSystem = objVcHostConfigManager.serviceSystem;
		
	var objVcHostServiceInfo;
		objVcHostServiceInfo = objVcHostServiceSystem.serviceInfo;
		
	var arrVcHostService;
		arrVcHostService = objVcHostServiceInfo.service;
		
	for ( var ii = 0; ii < arrVcHostService.length; ii++ )
	{
		var objVcHostService;
			objVcHostService = arrVcHostService[ii];
			
		if ( objVcHostService.key == "TSM-SSH")
		{
			if ( objVcHostService.policy != "off" )
			{
				objVcHostServiceSystem.updateServicePolicy("TSM-SSH", "off");
			}
		
			if ( objVcHostService.running == true )
			{
				objVcHostServiceSystem.stopService("TSM-SSH");
			}
		}
	}		
}
