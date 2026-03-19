/**
 * configure
 *
 * @param {VC:StoragePod} storagePod
 * @param {Array/VC:VirtualMachine} vms
 * @param {string} ruleName
 * @return {VC:Task} task
 */
var rule = new VcClusterAntiAffinityRuleSpec();
rule.key = -30;
rule.enabled = true;
rule.name = ruleName;
rule.userCreated = true;
rule.vm = vms;

var podSpecRules = new Array();
var podSpecRule = new VcClusterRuleSpec();
podSpecRule.operation = VcArrayUpdateOperation.add;
podSpecRule.info = rule;
podSpecRules.push(podSpecRule);

var podSpec = new VcStorageDrsPodConfigSpec();
podSpec.rule = podSpecRules;

var spec = new VcStorageDrsConfigSpec();
spec.podConfigSpec = podSpec;

var m = storagePod.vimHost.storageResourceManager;
task = m.configureStorageDrsForPod_Task(storagePod, spec , true);