/**
 * Set device
 *
 * @param {VC:HostSystem} host
 * @param {string} device
 * @return {VC:Task} task
 */
var config = new VcVsanHostConfigInfo();
config.enabled = host.configManager.vsanSystem.config.enabled;
config.networkInfo = new VcVsanHostConfigInfoNetworkInfo();
config.networkInfo.port = [new VcVsanHostConfigInfoNetworkInfoPortConfig()];
config.networkInfo.port[0].device = device;
task = host.configManager.vsanSystem.updateVsan_Task(config);
