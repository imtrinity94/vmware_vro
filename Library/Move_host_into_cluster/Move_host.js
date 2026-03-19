/**
 * Move host
 *
 * @param {VC:ClusterComputeResource} cluster
 * @param {VC:HostSystem} host
 * @param {VC:ResourcePool} resourcePool
 * @return {VC:Task} task
 */
if(host.parent instanceof VcClusterComputeResource){
	resourcePool=null;
}
task = cluster.moveHostInto_Task(host, resourcePool);