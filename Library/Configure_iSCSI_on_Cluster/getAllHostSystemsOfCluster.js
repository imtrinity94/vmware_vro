/**
 * Return all the host system in a cluster
 *
 * @param {VC:ClusterComputeResource} cluster
 * @return {Array/VC:HostSystem} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.vc.cluster").getAllHostSystemsOfCluster(cluster) ;