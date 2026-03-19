/**
 * Get ESXi hosts from cluster
 *
 * @param {VC:ClusterComputeResource} clusterName
 * @return {Array/VC:HostSystem} hosts
 */
if (clusterName != undefined || clusterName != null)
{
	hosts = clusterName.host;
} else 
{
	throw "Undefined vCentre Cluster";
}