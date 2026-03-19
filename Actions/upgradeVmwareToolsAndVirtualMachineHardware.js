/**
 * @description Upgrades VMware Tools and virtual hardware version for all VMs within
 *              a specified compute resource's resource pool. Checks current tools
 *              status and hardware version before initiating upgrade tasks.
 * @note JSDoc generated via Antigravity AI IDE and can be reasonably incorrect.
 *
 * @param {VC:ComputeResource} vcComputeResourceObj - The compute resource containing the VMs to upgrade.
 * @returns {void}
 */

var vcoflowModuleHandle = System.getModule("com.vcoflow");
var rootResourcePoolHandle = vcComputeResourceObj.resourcePool;
var computeResourceVmsList = rootResourcePoolHandle.vm;

System.log("Initiating inventory-wide upgrade check for " + computeResourceVmsList.length + " VM(s) in " + vcComputeResourceObj.name);

var i;
for (i = 0; i < computeResourceVmsList.length; i++) {
    var vcVirtualMachineItem = computeResourceVmsList[i];
    var vcEnvBrowserHandle = vcVirtualMachineItem.environmentBrowser;
    
    // Analyze VM metadata for current tools status
    var vcVmSummaryObj = vcVirtualMachineItem.summary;
    var guestHealthSummaryObj = vcVmSummaryObj.guest;
    var toolsHealthStatusStr = guestHealthSummaryObj.toolsVersionStatus2;

    System.debug("Processing VM: " + vcVirtualMachineItem.name + " [Tools Status: " + toolsHealthStatusStr + "]");

    // Automated Tools Lifecycle Management
    if ((toolsHealthStatusStr === "guestToolsNeedUpgrade") || (toolsHealthStatusStr === "guestToolsNotInstalled")) {
        System.log("Instructing vCenter to mount and upgrade VMware Tools for: " + vcVirtualMachineItem.name);
        try {
            vcVirtualMachineItem.mountToolsInstaller();
            // Silent upgrade with reboot suppression
            var tUpgradeTask = vcVirtualMachineItem.upgradeTools_Task('/s /v"/qn REBOOT=ReallySuppress"');
            vcoflowModuleHandle.WaitForVcTask(tUpgradeTask);
            vcVirtualMachineItem.unmountToolsInstaller();
            System.log("VMware Tools upgrade task finalized for " + vcVirtualMachineItem.name);
        } catch (toolsEx) {
            System.error("Failed to execute Tools upgrade cycle for " + vcVirtualMachineItem.name + ". Error: " + toolsEx);
        }
    }

    // Automated Virtual Hardware Lifecycle Management
    var vcConfigOptionsObj = vcEnvBrowserHandle.queryConfigOption();
    var currentHwVersionInt = vcConfigOptionsObj.hardwareOptions.hwVersion;

    System.debug("VM Hardware Version Check: Current=" + currentHwVersionInt + " [Target: 9]");

    if (currentHwVersionInt < 9) {
        System.log("Upgrading Virtual Hardware for " + vcVirtualMachineItem.name + " to vmx-09.");
        try {
            var hwUpgradeTask = vcVirtualMachineItem.upgradeVM_Task("vmx-09");
            vcoflowModuleHandle.WaitForVcTask(hwUpgradeTask);
            System.log("Hardware upgrade sequence successful for " + vcVirtualMachineItem.name);
        } catch (hwEx) {
            System.error("Hardware upgrade task failed for " + vcVirtualMachineItem.name + ". Error: " + hwEx);
        }
    }
}

System.log("Compute Resource upgrade cycle completed.");

return null;
