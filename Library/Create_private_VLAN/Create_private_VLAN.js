/**
 * Create private VLAN
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
var pvlanConfigSpec = new VcVMwareDVSPvlanConfigSpec();
pvlanConfigSpec.pvlanEntry = new VcVMwareDVSPvlanMapEntry();
pvlanConfigSpec.pvlanEntry.primaryVlanId = primaryVlanId;
pvlanConfigSpec.pvlanEntry.secondaryVlanId = secondaryVlanId;
pvlanConfigSpec.pvlanEntry.pvlanType = vlanType;
pvlanConfigSpec.operation = "add"; // valid values: add, edit, remove

var pvlanConfigSpecArray = new Array();

var privateLanExists = false;
//Check if PVLAN with that ID already exists
var pvlanConfigs = dvSwitch.config.pvlanConfig;
if(pvlanConfigs != null){
	for each (pvlanConfig in pvlanConfigs){
		if ( pvlanConfig.primaryVlanId == primaryVlanId ) {
			privateLanExists = true;
		}
	}
}
if (!privateLanExists && primaryVlanId != secondaryVlanId) {
	var same = new VcVMwareDVSPvlanConfigSpec();
	same.pvlanEntry = new VcVMwareDVSPvlanMapEntry();
	same.pvlanEntry.primaryVlanId = primaryVlanId;
	same.pvlanEntry.secondaryVlanId = primaryVlanId;
	same.pvlanEntry.pvlanType = "promiscuous";
	same.operation = "add"; // valid values: add, edit, remove
	
	pvlanConfigSpecArray.push(same);
}
pvlanConfigSpecArray.push(pvlanConfigSpec);
spec.pvlanConfigSpec = pvlanConfigSpecArray;

task = dvSwitch.reconfigureDvs_Task(spec);  // VmwareDistributedVirtualSwitch