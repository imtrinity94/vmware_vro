/**
 * Remove disks
 *
 * @param {VC:HostSystem} host
 * @param {Array/string} hddNames
 * @return {VC:Task} task
 */
var hdds = System.getModule("com.vmware.library.vc.storage.vsan").findVsanDisks(host, hddNames);

task = host.configManager.vsanSystem.removeDisk_Task(hdds);
