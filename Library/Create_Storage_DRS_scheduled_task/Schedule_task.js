/**
 * Schedule task
 *
 * @param {VC:StoragePod} storagePod
 * @param {boolean} enable
 * @param {boolean} fullyAutomated
 * @param {boolean} ioLoadBalanceEnabled
 * @param {number} spaceUtilizationThreshold
 * @param {number} ioLatencyThreshold
 * @param {number} minSpaceUtilizationDifference
 * @param {number} loadBalanceInterval
 * @param {number} ioLoadImbalanceThreshold
 * @param {string} taskName
 * @param {Array/string} weekDays
 * @param {number} hour
 * @param {number} minute
 * @return {Any} outTask
 */
//SDRS specification
var spaceCfg = new VcStorageDrsSpaceLoadBalanceConfig();
spaceCfg.spaceUtilizationThreshold = spaceUtilizationThreshold;
spaceCfg.minSpaceUtilizationDifference = minSpaceUtilizationDifference;

var ioCfg = new VcStorageDrsIoLoadBalanceConfig();
ioCfg.ioLatencyThreshold = ioLatencyThreshold;
ioCfg.ioLoadImbalanceThreshold = ioLoadImbalanceThreshold;

var podSpec = new VcStorageDrsPodConfigSpec();
podSpec.enabled = enable;
podSpec.ioLoadBalanceEnabled = ioLoadBalanceEnabled;
podSpec.defaultVmBehavior = (fullyAutomated)?'automated':'manual';
podSpec.defaultIntraVmAffinity = true;
podSpec.loadBalanceInterval = loadBalanceInterval;
podSpec.spaceLoadBalanceConfig = spaceCfg;
podSpec.ioLoadBalanceConfig = ioCfg;

var spec = new VcStorageDrsConfigSpec();
spec.podConfigSpec = podSpec;

//Task specification
var cDate = new Date();
cDate.setHours(hour);
cDate.setMinutes(minute);
var scheduler = new VcWeeklyTaskScheduler();
scheduler.interval = 1;
scheduler.minute = cDate.getUTCMinutes();
scheduler.hour = cDate.getUTCHours();
for (i in weekDays) {
	if('Mon' == weekDays[i]) {
		scheduler.monday = true;
	} else if ('Tue' == weekDays[i]) {
		scheduler.tuesday = true;
	} else if ('Wed' == weekDays[i]) {
		scheduler.wednesday = true;
	} else if ('Thu' == weekDays[i]) {
		scheduler.thursday = true;
	} else if ('Fri' == weekDays[i]) {
		scheduler.friday = true;
	} else if ('Sat' == weekDays[i]) {
		scheduler.saturday = true;
	} else if ('Sun' == weekDays[i]) {
		scheduler.sunday = true;
	}
}

var argument = new Array();
argument[0] = new VcMethodActionArgument();
argument[0].value = storagePod.reference;
argument[1] = new VcMethodActionArgument()
argument[1].value = spec;
argument[2] = new VcMethodActionArgument();
argument[2].value = false;

var taskSpec = new VcScheduledTaskSpec();
taskSpec.name = taskName;
taskSpec.enabled = true;
taskSpec.description = 'vCO WF';
taskSpec.scheduler = scheduler;
taskSpec.action = new VcMethodAction();
taskSpec.action.name = "ConfigureStorageDrsForPod_Task";
taskSpec.action.argument = argument; 

var m = storagePod.vimHost.scheduledTaskManager;
outTask = m.createObjectScheduledTask(storagePod.vimHost.storageResourceManager.reference, taskSpec);