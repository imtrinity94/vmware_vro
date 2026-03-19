/**
 * @description Upgrades VMware Tools and virtual hardware version for all VMs within
 *              a specified compute resource's resource pool. Checks current tools
 *              status and hardware version before initiating upgrade tasks.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {VC:ComputeResource} objVcComputeResource - The compute resource containing the VMs to upgrade.
 * @returns {void}
 */

var objModule = System.getModule("com.vcoflow");

var objVcResourcePool = objVcComputeResource.resourcePool;

var arrVcVirtualMachine = objVcResourcePool.vm;

for (var i = 0; i < arrVcVirtualMachine.length; i++) {
    var objVcVirtualMachine = arrVcVirtualMachine[i];

    var objVcEnvironmentBrowser = objVcVirtualMachine.environmentBrowser;

    var objVcVirtualMachineSummary = objVcVirtualMachine.summary;

    var objVcVirtualMachineGuestSummary = objVcVirtualMachineSummary.guest;

    var strVMwareToolsVersionStatus = objVcVirtualMachineGuestSummary.toolsVersionStatus;

    var strVMwareToolsVersionStatus2 = objVcVirtualMachineGuestSummary.toolsVersionStatus2;

    //	if ( ( strVMwareToolsVersionStatus == "guestToolsNeedUpgrade" ) || ( strVMwareToolsVersionStatus == "guestToolsNotInstalled" ) )
    if ((strVMwareToolsVersionStatus2 == "guestToolsNeedUpgrade") || (strVMwareToolsVersionStatus2 == "guestToolsNotInstalled")) {
        objVcVirtualMachine.mountToolsInstaller();

        var objVcTask = objVcVirtualMachine.upgradeTools_Task('/s /v"/qn REBOOT=ReallySuppress"');

        objModule.WaitForVcTask(objVcTask);

        objVcVirtualMachine.unmountToolsInstaller();
    }

    var objVirtualMachineConfigOption = objVcEnvironmentBrowser.queryConfigOption();

    var objVcVirtualHardwareOption = objVirtualMachineConfigOption.hardwareOptions;

    var intHardwareVersion = objVcVirtualHardwareOption.hwVersion;

    if (intHardwareVersion < 9) {
        var objVcTask = objVcVirtualMachine.upgradeVM_Task("vmx-09");

        objModule.WaitForVcTask(objVcTask);
    }
}
