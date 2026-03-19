/**
 * Set and check VM
 *
 * @param {number} currentVM
 * @param {Array/VC:VirtualMachine} vmToConvert
 * @param {VC:Datastore} datastoreTarget
 * @param {boolean} isVMSupported
 * @return {VC:VirtualMachine} activeVM
 * @return {boolean} isVMSupported
 */
// Set our activeVM object:
var activeVM = vmToConvert[currentVM];
System.log("***");
System.log("Virtual Machine name : '" + activeVM.name + "'");

//Look if the vm is supported
isVMSupported=true;
//Powered On vm with snapshots are not supported
var vmIsPowerOnWithSnapshot = (activeVM.runtime.powerState == VcVirtualMachinePowerState.poweredOn) && (activeVM.snapshot!=null);
if(vmIsPowerOnWithSnapshot){
	isVMSupported=false;
	System.warn("The vm is not supported because it is powered on and have snapshot.");
}

//Look if a thick provisionned disk is in the second datastore
if(isVMSupported){
	var indexOfThickDisk=0;
	var indexOfThickOnOtherDatastore=0;
	for each (var device in activeVM.config.hardware.device) {
		if (device instanceof VcVirtualDisk) {
			if(!device.backing.thinProvisioned){
				indexOfThickDisk++;
				//look if the thick provisionned disk is in the right datastore
				var datastoreOfDisk = VcPlugin.convertToVimManagedObject(activeVM , device.backing.datastore);
				if(datastoreOfDisk==datastoreTarget){
					indexOfThickOnOtherDatastore++;
				}
			}
		}
	}

	//Find the datastore where is the virtual machine (.vmx)
	//var vmpath = activeVM.summary.config.vmPathName;
	//var first = vmpath.indexOf("[");
	//var last = vmpath.indexOf("]");
	//var datastoreOfVM = vmpath.substring(first+1,last);
	
	//Look if the .vmx is in the right datastore
	//if(datastoreOfVM==datastoreTarget.name){
		//System.warn("All the thick provisioned disks of the vm are in the datastore you choose to host the VMs during the conversion. It's not supported");
		//isVMSupported=false;
	//}
	
	if(indexOfThickDisk==0){
		//One or more of the disk are on the target datastore
		System.warn("This vm as no thick provisioned disk.");
		isVMSupported=false;
	}else if(indexOfThickOnOtherDatastore>0){
		//all the thick disks are on the target datastore, it's not supported
		System.log("One or more of the thick provisioned disks of the vm are in the datastore where you choose to host the VMs during the conversion, so they will be moved back to the first datastore.");
	}
}






