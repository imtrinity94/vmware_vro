/**
 * Create standard virtual switch
 *
 * @param {string} name
 * @param {number} numberOfPorts
 * @param {VC:HostSystem} host
 * @return {string} vSwitchName
 */
var config = new VcHostNetworkConfig();

config.vswitch = [new VcHostVirtualSwitchConfig()];
config.vswitch[0].changeOperation = "add";
config.vswitch[0].name = name;
config.vswitch[0].spec = new VcHostVirtualSwitchSpec();
config.vswitch[0].spec.numPorts = numberOfPorts;

//VcHostNetworkConfigResult
var myVcHostNetworkConfigResult = host.configManager.networkSystem.updateNetworkConfig(config, "modify"); // HostNetworkSystem
vSwitchName = name;


