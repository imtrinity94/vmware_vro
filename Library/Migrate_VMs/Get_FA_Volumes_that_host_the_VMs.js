/**
 * Get FA Volumes that host the VMs
 *
 * @param {Array/VC:VirtualMachine} virtualMachines
 * @param {boolean} migrate
 * @return {Array/string} vmStates
 * @return {Array/VC:ResourcePool} vmResourcePools
 * @return {Array/string} vmPaths
 * @return {Array/string} vmNames
 * @return {Array/string} sourcevmPath
 * @return {Array/VC:VmFolder} sourceVMFolders
 * @return {Array/VC:HostSystem} hosts
 * @return {Array/PS:Volume} faVolumes
 */
var faVolumes=new Array();
var hosts = new Array();
var vmNames = new Array();
var vmPaths = new Array();
var sourcevmPath = new Array();
var vmResourcePools = new Array();
var vmStates = new Array();
var sourceVMFolders = new Array();
for each(vm in virtualMachines){
	//Get the FA volume hosting the VM.
	var datastores=vm.datastore;
	var faVolume=System.getModule("com.purestorage.flasharray.vmware.vcenter").vmfsVolumeToFAVolume(datastores[0]);
	faVolumes.push(faVolume);
	//Get vmFolder of VM
    var vmFolder = System.getModule("com.purestorage.flasharray.vmware.vcenter").getVmFolderfromDatastore(datastores[0]);
	sourceVMFolders.push(vmFolder);
	//Get the host of VM
	var host = VcPlugin.convertToVimManagedObject(vm, vm.runtime.host);
	var flag = false;
		for(var i = 0; i < hosts.length; i++){
			if(hosts[i].id == host.id){
				flag = true;
				break;	
			}
		}
		if(!flag)
		{	
			hosts.push(host);
		}
	
	//Store the VM name and vmx file path
	//in clone scenario, target VM names are appended with a suffix so that source and target VM names do not conflict
	if(!migrate){
 		vmNames.push(vm.name + "-clone");
 	}
	else{
		vmNames.push(vm.name);
	}
	var vmPath = vm.config.files.vmPathName;
	vmPaths.push(vmPath);
	var resourcePool = System.getModule("com.vmware.library.vc.resourcePool").getValidResourcePoolForDatastore(datastores[0]);
	vmResourcePools.push(resourcePool[0]);
	vmState = vm.runtime.powerState.value;
	vmStates.push(vmState);
	sourcevmPath.push(vmPath);
}




