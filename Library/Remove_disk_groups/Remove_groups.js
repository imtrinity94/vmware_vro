/**
 * Remove groups
 *
 * @param {VC:HostSystem} host
 * @param {Array/string} ssdNames
 * @return {VC:Task} task
 */
var mappings = [];

var vsanSystem = host.configManager.vsanSystem;

var diskMappings = vsanSystem.config.storageInfo.diskMapping;
for (var s in ssdNames) {
	var ssdName = ssdNames[s];
	for (var m in diskMappings) {
		var diskMapping = diskMappings[m];
		if (diskMapping.ssd.displayName == ssdName) {
			mappings.push(diskMapping);
		}
	}
}

task = vsanSystem.removeDiskMapping_Task(mappings);
