/**
 * Remove
 *
 * @param {VC:HostSystem} host
 * @return {VC:Task} task
 */
if (host.parent instanceof VcClusterComputeResource) {
	task = host.destroy_Task();
}
else {
	task = host.parent.destroy_Task();
}
