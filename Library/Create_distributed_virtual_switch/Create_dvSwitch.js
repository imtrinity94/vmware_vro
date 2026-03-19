/**
 * Create dvSwitch
 *
 * @param {VC:NetworkFolder} networkFolder
 * @param {string} dvSwitchName
 * @param {Array/string} uplinkPortNameArray
 * @param {string} dvSwitchVersion
 * @return {VC:Task} task
 */
// ------- CreateDVS_Task -------
var spec = new VcDVSCreateSpec();
spec.configSpec = new VcDVSConfigSpec();
spec.configSpec.name = dvSwitchName;
spec.configSpec.uplinkPortPolicy = new VcDVSNameArrayUplinkPortPolicy();
spec.configSpec.uplinkPortPolicy.uplinkPortName = uplinkPortNameArray;

spec.productInfo = new VcDistributedVirtualSwitchProductSpec();
spec.productInfo.name = "DVS";
spec.productInfo.vendor = "VMware";
spec.productInfo.version = dvSwitchVersion;

var dvSwitchCreationTask = networkFolder.createDVS_Task(spec);  // Folder
System.log("dvSwitchCreationTask: " + dvSwitchCreationTask);
// ------- Retrieve dvSwitch ------
task = dvSwitchCreationTask;
