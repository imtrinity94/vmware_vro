var objModule;
	objModule = System.getModule("com.vcoflow");

var objVcComputeResource;

var objVcResourcePool;
	objVcResourcePool = objVcComputeResource.resourcePool;

var arrVcVirtualMachine;
	arrVcVirtualMachine = objVcResourcePool.vm;

for ( var i = 0; i < arrVcVirtualMachine.length; i++ )
{
	var objVcVirtualMachine;
		objVcVirtualMachine = arrVcVirtualMachine[i];
	
	var objVcEnvironmentBrowser;
		objVcEnvironmentBrowser = objVcVirtualMachine.environmentBrowser;

	var objVcVirtualMachineSummary;
		objVcVirtualMachineSummary = objVcVirtualMachine.summary;

	var objVcVirtualMachineGuestSummary;
		objVcVirtualMachineGuestSummary = objVcVirtualMachineSummary.guest;

	var strVMwareToolsVersionStatus;
		strVMwareToolsVersionStatus = objVcVirtualMachineGuestSummary.toolsVersionStatus;
	
	var strVMwareToolsVersionStatus2;
		strVMwareToolsVersionStatus2 = objVcVirtualMachineGuestSummary.toolsVersionStatus2;

//	if ( ( strVMwareToolsVersionStatus == "guestToolsNeedUpgrade" ) || ( strVMwareToolsVersionStatus == "guestToolsNotInstalled" ) )
	if ( ( strVMwareToolsVersionStatus2 == "guestToolsNeedUpgrade" ) || ( strVMwareToolsVersionStatus2 == "guestToolsNotInstalled" ) )
	{
		objVcVirtualMachine.mountToolsInstaller();
		
		var objVcTask;
			objVcTask = objVcVirtualMachine.upgradeTools_Task('/s /v"/qn REBOOT=ReallySuppress"');
		
		objModule.WaitForVcTask(objVcTask);
		
		objVcVirtualMachine.unmountToolsInstaller();
	}

	var objVirtualMachineConfigOption;
		objVirtualMachineConfigOption = objVcEnvironmentBrowser.queryConfigOption();

	var objVcVirtualHardwareOption;
		objVcVirtualHardwareOption = objVirtualMachineConfigOptionhardwareOptions;
	
	var intHardwareVersion;
		intHardwareVersion = objVcVirtualHardwareOption.hwVersion;

	if ( intHardwareVersion < 9 ) 
	{
		var objVcTask;
			objVcTask = objVcVirtualMachine.upgradeVM_Task("vmx-09");

		objModule.WaitForVcTask(objVcTask);
	}
}
