/**
 * Find VM by Uuid
 *
 * @param {Array/VC:VirtualMachine} foundVms - [object Object]
 * @param {string} uuid
 * @return {VC:VirtualMachine} outVm
 */
System.log("found VMs count " + foundVms.length);
for (var i in foundVms) {
  var vm = foundVms[i];
  System.log("       -> " + vm.id + "[" + vm.config + "]");
  if(vm.config.uuid.equals(uuid)){
	outVm = vm;
	break;
  }
}
System.log("out vm = " + outVm);
//if not found dunesId will be null