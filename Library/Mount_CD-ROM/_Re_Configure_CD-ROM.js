/**
 * (Re)Configure CD-ROM
 *
 * @param {VC:VirtualMachine} vm
 * @param {Any} cdrom
 * @param {boolean} connectAtPowerOn
 * @param {string} deviceType
 * @param {string} filePath
 * @param {number} ideControllerKey
 * @return {VC:Task} task
 */
// Connectable info for CD-ROM
var connectInfo = new VcVirtualDeviceConnectInfo();
connectInfo.allowGuestControl = true;
connectInfo.connected = true;
connectInfo.startConnected = connectAtPowerOn;

// Create CD-ROM BackingInfo
var backingInfo = null;
if ( deviceType == "Client Device" )  {
	backingInfo = new VcVirtualCdromRemotePassthroughBackingInfo();
	backingInfo.deviceName = "";
}
else if ( deviceType == "Host Device" )  {
	backingInfo = new VcVirtualCdromAtapiBackingInfo();
	backingInfo.deviceName = "/dev/cdrom";
}
else if ( deviceType == "Datastore ISO File" )  {
 	backingInfo = new VcVirtualCdromIsoBackingInfo();
	backingInfo.fileName = filePath;
}
else  {
	throw "Unsupported CD-ROM device type (" + deviceType + ")";
}

// CD-ROM ConfigSpec
var deviceConfigSpec = new VcVirtualDeviceConfigSpec();

if (cdrom == null) {
	// device not found, create and add a new one
	cdrom = new VcVirtualCdrom();
	cdrom.controllerKey = ideControllerKey;
	cdrom.key = 0;
	cdrom.unitNumber = 0;
	deviceConfigSpec.operation = VcVirtualDeviceConfigSpecOperation.add;
} else {
	// device found, reconfigure it
	deviceConfigSpec.operation = VcVirtualDeviceConfigSpecOperation.edit;
}

cdrom.backing = backingInfo;
cdrom.connectable = connectInfo;

deviceConfigSpec.device = cdrom;

var deviceConfigSpecs = new Array();
deviceConfigSpecs.push(deviceConfigSpec);

var configSpec = new VcVirtualMachineConfigSpec();
configSpec.deviceChange = deviceConfigSpecs;

// Launch the reconfigVM task
task = vm.reconfigVM_Task( configSpec );
