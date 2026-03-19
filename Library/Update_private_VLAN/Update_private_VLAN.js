/**
 * Update private VLAN
 *
 * @param {VC:VmwareDistributedVirtualSwitch} dvSwitch
 * @param {number} primaryVlanId
 * @param {number} secondaryVlanId
 * @param {string} vlanType
 * @return {VC:Task} task
 */
// ------- ReconfigureDvs_Task -------
var spec = new VcVMwareDVSConfigSpec();
spec.configVersion = dvSwitch.config.configVersion; // Retrieve the current ConfigVersion (increments with each change)

// create the private vlan config spec:
spec.pvlanConfigSpec = [new VcVMwareDVSPvlanConfigSpec()];
spec.pvlanConfigSpec[0].pvlanEntry = new VcVMwareDVSPvlanMapEntry();
spec.pvlanConfigSpec[0].pvlanEntry.primaryVlanId = primaryVlanId;
spec.pvlanConfigSpec[0].pvlanEntry.secondaryVlanId = secondaryVlanId;
spec.pvlanConfigSpec[0].pvlanEntry.pvlanType = vlanType;
spec.pvlanConfigSpec[0].operation = "edit"; // valid values: add, edit, remove

task = dvSwitch.reconfigureDvs_Task(spec);  // VmwareDistributedVirtualSwitch
