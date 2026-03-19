/**
 * Attach host system
 *
 * @param {VC:VmwareDistributedVirtualSwitch} dvSwitch
 * @param {VC:HostSystem} hostSystem
 * @param {string} vmNicToAttach
 * @param {VC:DistributedVirtualPortgroup} uplinkPortgroup
 * @return {VC:Task} task
 */
// ------- ReconfigureDvs_Task -------
var spec = new VcDVSConfigSpec();
spec.configVersion = dvSwitch.config.configVersion;
spec.host = [new VcDistributedVirtualSwitchHostMemberConfigSpec()];
spec.host[0].operation = "add";
spec.host[0].host = hostSystem.reference;

spec.host[0].backing = new VcDistributedVirtualSwitchHostMemberPnicBacking();
spec.host[0].backing.pnicSpec = [new VcDistributedVirtualSwitchHostMemberPnicSpec()];
spec.host[0].backing.pnicSpec[0].pnicDevice = vmNicToAttach;
if (uplinkPortgroup) {
    spec.host[0].backing.pnicSpec[0].uplinkPortgroupKey = uplinkPortgroup.key;
}

task = dvSwitch.reconfigureDvs_Task(spec);  // VmwareDistributedVirtualSwitch

