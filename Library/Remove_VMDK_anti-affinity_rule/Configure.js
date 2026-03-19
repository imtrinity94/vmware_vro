/**
 * Configure
 *
 * @param {VC:StoragePod} storagePod
 * @param {string} ruleName
 * @return {VC:Task} task
 */

var vmConfigSpec = new Array();
var vms = storagePod.podStorageDrsEntry.storageDrsConfig.vmConfig;
var j = 0;
for (i in vms) {
	if (vms[i].intraVmAntiAffinity == null || vms[i].intraVmAntiAffinity.name != ruleName) {
		continue;
	}
	var vmSpec = new VcStorageDrsVmConfigSpec();
	vmSpec.operation = VcArrayUpdateOperation.edit;
	var vmInfo = new VcStorageDrsVmConfigInfo();
	vmInfo.vm = vms[i].vm;
	vmInfo.behavior = vms[i].behavior;
	vmInfo.enabled = vms[i].enabled;
	vmInfo.intraVmAffinity = vms[i].intraVmAffinity;
	vmInfo.intraVmAntiAffinity = null;
	vmSpec.info = vmInfo;
	vmConfigSpec[j++] = vmSpec;
}

if (vmConfigSpec.length == 0) {
	throw vm.reference + ' not found in configuration!';
}

var spec = new VcStorageDrsConfigSpec();
spec.vmConfigSpec = vmConfigSpec;

var m = storagePod.vimHost.storageResourceManager;
task = m.configureStorageDrsForPod_Task(storagePod, spec , true);