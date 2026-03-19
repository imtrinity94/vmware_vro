/**
 * Create group
 *
 * @param {VC:HostSystem} host
 * @param {string} ssdName
 * @param {Array/string} hddNames
 * @return {VC:Task} task
 */
var ssd = System.getModule("com.vmware.library.vc.storage.vsan").findVsanDisks(host, [ssdName])[0];
var hdds = System.getModule("com.vmware.library.vc.storage.vsan").findVsanDisks(host, hddNames);

var mapping = new VcVsanHostDiskMapping();
mapping.ssd = ssd;
mapping.nonSsd = hdds;

task = host.configManager.vsanSystem.initializeDisks_Task([mapping]);
