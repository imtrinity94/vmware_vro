/**
 * It correlates cluster to specific hostgroup.
 *
 * @param {VC:ClusterComputeResource} clusterName - [object Object]
 * @param {PS:FlashArrayConnection} flashArrayConnection - [object Object]
 * @return {PS:HostGroup} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.purestorage.flasharray.vmware.vcenter").correlateClusterToHostGroup(clusterName,flashArrayConnection) ;