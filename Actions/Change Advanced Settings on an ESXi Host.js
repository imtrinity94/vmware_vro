var arrVcOptionValue;
	arrVcOptionValue = new Array();

var objVcOptionValue;
	
	objVcOptionValue = new VcOptionValue();
	objVcOptionValue.key = "Syslog.global.logHost";
	objVcOptionValue.value = "udp://192.168.1.181:514";
	
	arrVcOptionValue.push(objVcOptionValue);

	objVcOptionValue = new VcOptionValue();
	objVcOptionValue.key = "Net.NetSchedInFlightMaxBytesDefault"; // 1Gbps = 20000
	objVcOptionValue.value = "100000";

	arrVcOptionValue.push(objVcOptionValue);

	objVcOptionValue = new VcOptionValue();
	objVcOptionValue.key = "Net.NetSchedInFlightMaxBytesHigh"; // 10Gbps = 66000
	objVcOptionValue.value = "500000";

	arrVcOptionValue.push(objVcOptionValue);
	
	objVcOptionValue = new VcOptionValue();
	objVcOptionValue.key = "Net.NetSchedInFlightMaxPktsDefault"; // 1Gbps = 20
	objVcOptionValue.value = "200";

	arrVcOptionValue.push(objVcOptionValue);

	objVcOptionValue = new VcOptionValue();
	objVcOptionValue.key = "Net.NetSchedInFlightMaxPktsHigh"; // 10Gbps = 50
	objVcOptionValue.value = "800";

	arrVcOptionValue.push(objVcOptionValue);	

var arrVcHostSystem;
	arrVcHostSystem = objVcClusterComputeResource.host;

for ( var i = 0; i < arrVcHostSystem.length; i++ )
{
	var objVcHostSystem;
		objVcHostSystem = arrVcHostSystem[i];

	var objVcTask;
		objVcTask = objVcHostSystem.enterMaintenanceMode_Task(15000, true);
			 
	objModule.WaitForVcTask(objVcTask);
			
	var objVcHostConfigManager;
		objVcHostConfigManager = objVcHostSystem.configManager;
		
	var objVcOptionManager;
		objVcOptionManager = objVcHostConfigManager.advancedOption;
		objVcOptionManager.updateOptions(arrVcOptionValue);
		
	var objVcTask;
		objVcTask = objVcHostSystem.exitMaintenanceMode_Task(15000, true);
		
	objModule.WaitForVcTask(objVcTask);	
}
