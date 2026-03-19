/**
 * Delete private VLAN
 *
 * @param {VC:VmwareDistributedVirtualSwitch} dvSwitch
 * @param {number} primaryVlanId
 * @param {number} secondaryVlanId
 * @return {VC:Task} reconfigureDvs_Task
 */
// ------- ReconfigureDvs_Task -------
var spec = new VcVMwareDVSConfigSpec();
spec.configVersion = dvSwitch.config.configVersion; // Retrieve the current ConfigVersion (increments with each change)

// create the private vlan config spec:
spec.pvlanConfigSpec = [new VcVMwareDVSPvlanConfigSpec()];
spec.pvlanConfigSpec[0].pvlanEntry = new VcVMwareDVSPvlanMapEntry();
spec.pvlanConfigSpec[0].pvlanEntry.primaryVlanId = primaryVlanId;
spec.pvlanConfigSpec[0].pvlanEntry.secondaryVlanId = secondaryVlanId;
spec.pvlanConfigSpec[0].pvlanEntry.pvlanType = System.getModule("com.vmware.library.vc.networking").getPrivateVlanTypeForIds(dvSwitch,primaryVlanId, secondaryVlanId);
spec.pvlanConfigSpec[0].operation = "remove"; // valid values: add, edit, remove

reconfigureDvs_Task = dvSwitch.reconfigureDvs_Task(spec);  // VmwareDistributedVirtualSwitch