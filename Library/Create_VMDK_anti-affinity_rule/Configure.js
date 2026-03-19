/**
 * Configure
 *
 * @param {VC:StoragePod} storagePod
 * @param {VC:VirtualMachine} vm
 * @param {Array/string} disks
 * @param {string} ruleName
 * @return {VC:Task} task
 */
function parseDiskIds() {
	var ret = new Array();
	for (i in disks) {
		var arr = /.*\((\d+)\)$/(disks[i]);
		ret.push(parseInt(arr[1]));
	}
	return ret;
}

var vmConfigSpec = new Array();
var vms = storagePod.podStorageDrsEntry.storageDrsConfig.vmConfig;
var j = 0;
for (i in vms) {
	if (vms[i].vm.reference.value != vm.reference.value) {
		continue;
	}
	var vmSpec = new VcStorageDrsVmConfigSpec();
	vmSpec.operation = VcArrayUpdateOperation.add;
	var vmInfo = new VcStorageDrsVmConfigInfo();
	vmInfo.vm = vms[i].vm;
	vmInfo.behavior = vms[i].behavior;
	vmInfo.enabled = vms[i].enabled;
	vmInfo.intraVmAffinity = vms[i].intraVmAffinity;
	var aRule = new VcVirtualDiskAntiAffinityRuleSpec();
	aRule.key = -11;
	aRule.enabled = true;
	aRule.name = ruleName;
	aRule.userCreated = true;
	aRule.diskId = parseDiskIds();
	vmInfo.intraVmAntiAffinity = aRule;
	vmSpec.info = vmInfo;
	vmConfigSpec[j++] = vmSpec;
}

if (vmConfigSpec.length == 0) {
	var vmSpec = new VcStorageDrsVmConfigSpec();
	vmSpec.operation = VcArrayUpdateOperation.add;
	var vmInfo = new VcStorageDrsVmConfigInfo();
	vmInfo.vm = vm;
//	vmInfo.behavior = VcStorageDrsPodConfigInfoBehavior.manual;
//	vmInfo.enabled = true;
	vmInfo.intraVmAffinity = false;
	var aRule = new VcVirtualDiskAntiAffinityRuleSpec();
	aRule.key = -11;
	aRule.enabled = true;
	aRule.name = ruleName;
	aRule.userCreated = true;
	aRule.diskId = parseDiskIds();
	vmInfo.intraVmAntiAffinity = aRule;
	vmSpec.info = vmInfo;
	vmConfigSpec[0] = vmSpec;
}

var spec = new VcStorageDrsConfigSpec();
spec.vmConfigSpec = vmConfigSpec;

var m = storagePod.vimHost.storageResourceManager;
task = m.configureStorageDrsForPod_Task(storagePod, spec , true);