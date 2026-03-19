/**
 * Generate Parameters
 *
 * @param {VC:HostSystem} destinationHost
 * @param {Array/VC:VirtualMachine} vms
 * @return {Array/Properties} parameters
 */
parameters = new Array();

for each (var vm in vms) {
	var p = new Properties();
	p.put("destinationHost", destinationHost);
	p.put("vm", vm);
	parameters.push(p);
}