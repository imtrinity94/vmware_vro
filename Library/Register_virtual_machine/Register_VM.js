/**
 * Register VM
 *
 * @param {VC:ResourcePool} resourcePool
 * @param {string} path
 * @param {string} name
 * @param {VC:HostSystem} host
 * @param {VC:VmFolder} folder
 * @param {boolean} asTemplate
 * @return {VC:Task} task
 */
if (asTemplate) {
	// make sure that resource pool is not specified for templates
	resourcePool = null;
}
task = folder.registerVM_Task(path, name, asTemplate, resourcePool, host);