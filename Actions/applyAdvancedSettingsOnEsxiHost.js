/**
 * @description Applies a set of predefined advanced configuration settings to all ESXi hosts
 *              within a vSphere cluster. Each host is placed into maintenance mode before the
 *              settings are applied, then taken out of maintenance mode afterwards.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {VC:ClusterComputeResource} objVcClusterComputeResource - The target vSphere cluster.
 * @param {*} objModule - A module reference providing the WaitForVcTask helper method.
 * @returns {void}
 */

var optionValueArray = new Array();

var optionLogHost = new VcOptionValue();
optionLogHost.key = "Syslog.global.logHost";
optionLogHost.value = "udp://192.168.1.181:514";
optionValueArray.push(optionLogHost);

var optionSchedByteDefault = new VcOptionValue();
optionSchedByteDefault.key = "Net.NetSchedInFlightMaxBytesDefault";
optionSchedByteDefault.value = "100000";
optionValueArray.push(optionSchedByteDefault);

var optionSchedByteHigh = new VcOptionValue();
optionSchedByteHigh.key = "Net.NetSchedInFlightMaxBytesHigh";
optionSchedByteHigh.value = "500000";
optionValueArray.push(optionSchedByteHigh);

var optionSchedPktDefault = new VcOptionValue();
optionSchedPktDefault.key = "Net.NetSchedInFlightMaxPktsDefault";
optionSchedPktDefault.value = "200";
optionValueArray.push(optionSchedPktDefault);

var optionSchedPktHigh = new VcOptionValue();
optionSchedPktHigh.key = "Net.NetSchedInFlightMaxPktsHigh";
optionSchedPktHigh.value = "800";
optionValueArray.push(optionSchedPktHigh);

var hostSystemArray = objVcClusterComputeResource.host;

var i;
for (i = 0; i < hostSystemArray.length; i++) {
    var host = hostSystemArray[i];

    var enterMaintenanceTask = host.enterMaintenanceMode_Task(15000, true);
    objModule.WaitForVcTask(enterMaintenanceTask);

    var configManager = host.configManager;
    var advancedOptionManager = configManager.advancedOption;
    advancedOptionManager.updateOptions(optionValueArray);

    var exitMaintenanceTask = host.exitMaintenanceMode_Task(15000, true);
    objModule.WaitForVcTask(exitMaintenanceTask);
}

return null;
