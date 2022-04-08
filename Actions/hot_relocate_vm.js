// VMware vRealize Orchestrator (vRO) action sample
//
// Relocates a VM when hosts do not share storage.
// Tested with vSphere 6.0.  Does not require VM to be powered off
// 
// For vRO/vRA 7.0+
//
// Action Inputs:
//  vm           - VC:VirtualMachine
//  datastore    - VC:Datastore
//  transform    - VC:VirtalMachineRelocatetransformation
//  host         - VC:HostSystem      (Required, even if part of DRS Cluster when VM powered on) 
//  pool         - VC:ResourcePool    (Required for DRS Clusters. Can be root resource pool of cluster)
//  movePriority - VC:VirtualMachineMovePriority
//  dvPortgroup  - VC:DistributedVirtualPortgroup (if current portgroup does not exist on target cluster)
//
// Return type: VC:Task

var relocateSpec = new VcVirtualMachineRelocateSpec();
if (datastore != null) {
	relocateSpec.datastore = datastore.reference;
}
if (host != null) {
	relocateSpec.host = host.reference;
}
if (pool != null) {
	relocateSpec.pool = pool.reference;
}
if (dvPortgroup != null) {
	var changespec = getNicChangeSpec(vm, dvPortgroup);
	System.log(changespec);
	relocateSpec.deviceChange = changespec;
}

if (transform != null) {
	relocateSpec.transform = VcVirtualMachineRelocateTransformation.fromString(transform.name);
}

return vm.relocateVM_Task(relocateSpec);


function getNicChangeSpec (vm, dvPortgroup) {
	var nicArray = new Array(); // Array holds each of the nic configurations (devicespecs)
	var nic = new VcVirtualEthernetCardDistributedVirtualPortBackingInfo(); // NIC configuration spec and backing info
	var port = new VcDistributedVirtualSwitchPortConnection(); // Port Connection details for dvSwitch backing
	// need to get the uuid of the distributed virtual switch hosting the portgroup:
	var dvSwitch = VcPlugin.convertToVimManagedObject(dvPortgroup, dvPortgroup.config.distributedVirtualSwitch);
	port.switchUuid = dvSwitch.uuid;
	port.portgroupKey = dvPortgroup.key;
	nic.port = port;
	
	var nicNumber = 0;
	var devicespec = new VcVirtualDeviceConfigSpec();
	var devices = vm.config.hardware.device;
	var actualPos = 0;
	for (var i in devices){
		if (System.getModule("com.vmware.library.vc.vm.network").isSupportedNic(devices[i])) {
			if(actualPos++ == nicNumber){
			  devicespec.device = devices[i];
				devicespec.operation = VcVirtualDeviceConfigSpecOperation.edit;
				devicespec.device.backing = nic;
				nicArray.push(devicespec);
		  }
	  }
	}
	return nicArray;
}
