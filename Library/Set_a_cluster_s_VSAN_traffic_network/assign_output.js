/**
 * assign output
 *
 * @param {Array/VC:HostSystem} hosts
 * @param {Array/string} deviceNames
 * @return {Array/Properties} hostDeviceNames
 */
hostDeviceNames = [];
for (var i in hosts) {
	hostDeviceName = {};
	hostDeviceName.hostSystem = hosts[i];
	hostDeviceName.deviceName = deviceNames[i];
	hostDeviceNames.push(hostDeviceName);
}
