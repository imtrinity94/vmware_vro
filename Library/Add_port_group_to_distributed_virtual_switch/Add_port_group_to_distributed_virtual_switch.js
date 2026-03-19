/**
 * Add port group to distributed virtual switch
 *
 * @param {string} dvPortGroupName
 * @param {string} dvPortgroupType
 * @param {VC:VmwareDistributedVirtualSwitch} dvSwitch
 * @param {number} numPorts
 * @return {VC:Task} dvPortgroupCreationTask
 */
// ------- AddDVPortgroup_Task -------

var DVPortgroupConfigSpec = new VcDVPortgroupConfigSpec()

DVPortgroupConfigSpec.name = dvPortGroupName;
DVPortgroupConfigSpec.numPorts = numPorts;
DVPortgroupConfigSpec.defaultPortConfig = new VcVMwareDVSPortSetting();
DVPortgroupConfigSpec.defaultPortConfig.vlan = new VcVmwareDistributedVirtualSwitchVlanIdSpec();
DVPortgroupConfigSpec.defaultPortConfig.vlan.inherited = false;
DVPortgroupConfigSpec.defaultPortConfig.vlan.vlanId = 0;
DVPortgroupConfigSpec.type = dvPortgroupType; // possible values: earlyBinding, lateBinding, ephemeral
// The task requires an array
var specArray = new Array();
specArray.push(DVPortgroupConfigSpec);
dvPortgroupCreationTask = dvSwitch.addDVPortgroup_Task(specArray);
