/**
 * Set Disk
 *
 * @param {VC:VirtualMachine} vm
 * @param {VC:SharesLevel} diskSharesLevel
 * @param {number} diskShares
 */
if ( diskSharesLevel == VcSharesLevel.custom ) {
	if ( diskShares == null ) {
		throw ("Error in disk parameters. At least one parameter was not set");
	}
}

System.log("Set Disk ressources: sharedModel=" + diskSharesLevel.name + ", share=" + diskShares);
Server.log("Set Disk ressources", "sharedModel=" + diskSharesLevel.name + ", share=" + diskShares);

var sharesInfo = System.getModule("com.vmware.library.vc.spec").getSharesInfo(diskSharesLevel,diskShares);

var virtualMachineConfigSpec = new VcVirtualMachineConfigSpec();
var deviceConfigSpecs = new Array();

var devices = vm.config.hardware.device;
var nbVirtualDisks = 0;
if ( devices != null )  {
	for ( var i in devices )  {
		if (devices[i] instanceof VcVirtualDisk) {
			System.log("VirtualDisk found (Key: " + devices[i].key + ")" );			
			var virtualDisk = devices[i]; 
			
			virtualDisk.shares = sharesInfo;
			
			deviceConfigSpec = new VcVirtualDeviceConfigSpec();
			deviceConfigSpec.device = virtualDisk;
			deviceConfigSpec.operation = VcVirtualDeviceConfigSpecOperation.edit;
			deviceConfigSpecs[nbVirtualDisks++] = deviceConfigSpec;											
		}
	}
}	

var virtualMachineConfigSpec = new VcVirtualMachineConfigSpec();
System.log(deviceConfigSpecs + ", size=" + deviceConfigSpecs.length);
virtualMachineConfigSpec.deviceChange = deviceConfigSpecs;		
var task = vm.reconfigVM_Task(virtualMachineConfigSpec);
System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(task,false,5);