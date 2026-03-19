/**
 * Configure
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
 * @return {VC:Task} task
 * @return {VC:StoragePod} outStoragePod
 */
var m = storagePod.vimHost.storageResourceManager;

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

task = m.configureStorageDrsForPod_Task(storagePod, spec , true);
outStoragePod = storagePod;