/**
 * Get VMs
 *
 * @param {boolean} allVMs
 * @param {Array/VC:VirtualMachine} choosenVMs
 * @param {Array/string} vmsUUID
 * @param {Array/VC:VirtualMachine} vms
 * @return {Array/string} vmsUUID
 * @return {Array/VC:VirtualMachine} vms
 */
var vms = new Array();
vmsUUID = new Array();
if(allVMs){
	vms = VcPlugin.getAllVirtualMachines();
}else{
	vms = choosenVMs;
}

for (i in vms){
	var vm = vms[i];
	var uuid = vm.config.uuid;
	vmsUUID.push(uuid);
}

//pour recupérer la vm avec l'uuid sînspirer du workflow Relink request that lost the link with its Virtual Machine (box Relinks vms)