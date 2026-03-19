/**
 * List objects
 *
 * @param {VC:ClusterComputeResource} cluster
 * @return {Array/Any} results
 */
results = []

function printDetails(whitespace, disk) {
	System.log(whitespace + "model: " + disk.model);
	System.log(whitespace + "capacity: " + (disk.capacity.block * disk.capacity.blockSize));
	System.log(whitespace + "operational state: " + disk.operationalState);
}

var hosts = cluster.host;
for (var h in hosts) {
	var host = hosts[h];
	var result = {};
	results.push(result);
	result.host = host;
	System.log("VSAN cluster host " + host.name + ":");
	var vsanSystem = host.configManager.vsanSystem;
	var mappings = vsanSystem.config.storageInfo.diskMapping;
	result.mappings = mappings;
	for (var m in mappings) {
		var mapping = mappings[m];
		System.log("    VSAN disk group:");
		var ssd = mapping.ssd;
		var hdds = mapping.nonSsd;
		System.log("        VSAN SSD disk: " + ssd.canonicalName);
		printDetails("            ", ssd);
		System.log("        VSAN non-SSD disks:");
		for (var d in hdds) {
			var hdd = hdds[d];
			System.log("            " + hdd.canonicalName);
			printDetails("                ", hdd);
		}
	}
	var vsanDisks = vsanSystem.queryDisksForVsan();
	var eligibleSsd = [];
	var eligibleHdd = [];
	for (var d in vsanDisks) {
		var vsanDisk = vsanDisks[d];
		if (vsanDisk.state == VcVsanHostDiskResultState.eligible.value) {
			var disk = vsanDisk.disk;
			if (disk.ssd) {
				eligibleSsd.push(disk);
			} else {
				eligibleHdd.push(disk);
			}
		}
	}
	result.eligibleSsd = eligibleSsd;
	result.eligibleNonSsd = eligibleHdd;
	System.log("    eligible SSD disks:");
	for (var e in eligibleSsd) {
		var ssd = eligibleSsd[e];
		System.log("        " + ssd.canonicalName);
		printDetails("            ", ssd);
	}
	System.log("    eligible non-SSD disks:");
	for (var e in eligibleHdd) {
		var hdd = eligibleHdd[e];
		System.log("        " + hdd.canonicalName);
		printDetails("            ", hdd);
	}
	if (h < (hosts.length - 1)) {
		System.log("");
	}
}
