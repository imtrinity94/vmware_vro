/**
 * Returns vCenter Host WWNs with host name in properties.
 *
 * @param {VC:ClusterComputeResource} cluster - [object Object]
 * @return {Properties} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.purestorage.flasharray.vmware.vcenter").getHostWWNs(cluster) ;