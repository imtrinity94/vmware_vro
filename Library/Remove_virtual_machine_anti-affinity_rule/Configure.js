/**
 * Configure
 *
 * @param {VC:StoragePod} storagePod
 * @param {string} ruleName
 * @return {VC:Task} task
 */
var rules = storagePod.podStorageDrsEntry.storageDrsConfig.podConfig.rule;
var rule = null;
for (var i in rules) {
	if (rules[i].name == ruleName) {
		rule = rules[i];
	}
}
if (null == rule) {
	throw 'Rule ' + ruleName + ' not found';
}

var podSpecRules = new Array();
var podSpecRule = new VcClusterRuleSpec();
podSpecRule.operation = VcArrayUpdateOperation.remove;
podSpecRule.removeKey = rule.key;
podSpecRule.info = rule;
podSpecRules.push(podSpecRule);

var podSpec = new VcStorageDrsPodConfigSpec();
podSpec.rule = podSpecRules;

var spec = new VcStorageDrsConfigSpec();
spec.podConfigSpec = podSpec;

var m = storagePod.vimHost.storageResourceManager;
task = m.configureStorageDrsForPod_Task(storagePod, spec , true);