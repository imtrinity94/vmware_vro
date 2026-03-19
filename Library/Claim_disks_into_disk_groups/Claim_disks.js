/**
 * Claim disks
 *
 * @param {VC:HostSystem} host
 * @param {Array/string} diskNames
 * @return {VC:Task} task
 */
var disks = System.getModule("com.vmware.library.vc.storage.vsan").findVsanDisks(host, diskNames);

task = host.configManager.vsanSystem.addDisks_Task(disks);
