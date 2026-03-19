/**
 * Add CD-ROM
 *
 * @param {VC:VirtualMachine} vm
 * @param {number} ideControllerKey
 * @param {string} filePath
 * @param {string} deviceType
 * @param {boolean} connectAtPowerOn
 * @return {VC:Task} task
 */
var configSpec = new VcVirtualMachineConfigSpec();
var deviceConfigSpecs = new Array();
var deviceConfigSpec;

// Connectable info for CD-ROM
var connectInfo = new VcVirtualDeviceConnectInfo();
connectInfo.allowGuestControl = true;
connectInfo.connected = false;
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
else if ( deviceType == "Datastore ISO file" )  {
 	backingInfo = new VcVirtualCdromIsoBackingInfo();
	backingInfo.datastore = null;
	if ( filePath != null )  {
		if ( filePath.indexOf( "[" ) > -1 )  {
			backingInfo.fileName = filePath;
		}
		else  {
			backingInfo.fileName = "[] " + filePath;
		}
	}
	else  {
		throw "Datastore ISO file is empty";
	}
}
else  {
	throw "Unsupported CD-ROM device type (" + deviceType + ")";
}
var cdrom = new VcVirtualCdrom();
cdrom.backing = backingInfo;
cdrom.controllerKey = ideControllerKey;
cdrom.key = 0;
cdrom.unitNumber = 0;
cdrom.connectable = connectInfo;
// Create CD-ROM ConfigSpec
var deviceConfigSpec = new VcVirtualDeviceConfigSpec();
deviceConfigSpec.device = cdrom;
deviceConfigSpec.operation = VcVirtualDeviceConfigSpecOperation.add;
deviceConfigSpecs[0] = deviceConfigSpec;

// List of devices
configSpec.deviceChange = deviceConfigSpecs;

// Launch the reconfigVM task
task = vm.reconfigVM_Task( configSpec );
