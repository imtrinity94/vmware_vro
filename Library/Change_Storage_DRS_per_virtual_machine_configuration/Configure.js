/**
 * Configure
 *
 * @param {VC:StoragePod} storagePod
 * @param {Array/VC:VirtualMachine} vms
 * @param {string} automationLevel
 * @param {boolean} vmdksTogether
 * @return {VC:Task} task
 */
var vmConfigSpec = new Array();
for (i in vms) {
	var vmSpec = new VcStorageDrsVmConfigSpec();
	vmSpec.operation = VcArrayUpdateOperation.add;
	var vmInfo = new VcStorageDrsVmConfigInfo();
	vmInfo.vm = vms[i].reference;
	if (automationLevel == 'manual' || automationLevel == 'automated') {
		vmInfo.behavior = automationLevel;
		vmInfo.enabled = true;
	}
	if (automationLevel == 'disabled') {
		vmInfo.enabled = false;
	}
	if (vmdksTogether == false) {
		vmInfo.intraVmAffinity = false;
	}
	vmSpec.info = vmInfo;
	vmConfigSpec[i] = vmSpec;
}
var spec = new VcStorageDrsConfigSpec();
spec.vmConfigSpec = vmConfigSpec;

var m = storagePod.vimHost.storageResourceManager;
task = m.configureStorageDrsForPod_Task(storagePod, spec , true);