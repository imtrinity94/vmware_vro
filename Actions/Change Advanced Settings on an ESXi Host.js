/**
 * @description Applies a set of predefined advanced configuration settings to all ESXi hosts
 *              within a vSphere cluster. Each host is placed into maintenance mode before the
 *              settings are applied, then taken out of maintenance mode afterwards.
 *              Settings configured: Syslog destination, and several network scheduling parameters.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {VC:ClusterComputeResource} objVcClusterComputeResource - The target vSphere cluster.
 * @param {*} objModule - A module reference providing the WaitForVcTask helper method.
 * @returns {void}
 */

var arrVcOptionValue = new Array();

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

var arrVcHostSystem = objVcClusterComputeResource.host;

for (var i = 0; i < arrVcHostSystem.length; i++) {
    var objVcHostSystem = arrVcHostSystem[i];

    var objVcTask = objVcHostSystem.enterMaintenanceMode_Task(15000, true);

    objModule.WaitForVcTask(objVcTask);

    var objVcHostConfigManager = objVcHostSystem.configManager;

    var objVcOptionManager = objVcHostConfigManager.advancedOption;
    objVcOptionManager.updateOptions(arrVcOptionValue);

    var objVcTask = objVcHostSystem.exitMaintenanceMode_Task(15000, true);

    objModule.WaitForVcTask(objVcTask);
}
