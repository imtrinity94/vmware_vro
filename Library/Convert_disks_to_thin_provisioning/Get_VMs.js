/**
 * Get VMs
 *
 * @param {VC:Datastore} datastore
 * @return {Array/VC:VirtualMachine} vmToConvert
 */
//Get all the vms of the datastore
//var vms = VcPlugin.getAllVirtualMachines();
var vms = datastore.vm;

var vmIsPowerOnWithSnapshot=false;

//look if this vms have thick provisionned disk, if yes, add in the vmToConvert
vmToConvert = new Array();
for (i in vms){
	var vm = vms[i];
	var index = 0;
	if (vm.summary.runtime.connectionState != VcVirtualMachineConnectionState.orphaned && !vm.config.template && vm.snapshot==null) {
		for each (var device in vm.config.hardware.device) {
			if (device instanceof VcVirtualDisk) {
				if(!device.backing.thinProvisioned){
					//look if the thick rovisionned disk is in the right datastore
					var datastoreOfDisk = VcPlugin.convertToVimManagedObject(vm , device.backing.datastore);
					if(datastoreOfDisk!=datastore){
						System.warn("One of the thick provisioned disk of the vm '" + vm.name +"' is not in the selected datastore but is on the datastore '" + datastoreOfDisk.name + "'.");
					}
					index ++;
				}
			}
		}
	}
	if(index>0){
		vmToConvert.push(vm);
	}
}







