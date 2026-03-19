/**
 * Checking version compatibility
 *
 * @param {VC:VirtualMachine} vm
 * @param {VC:ClusterComputeResource} cluster
 */
//Getting VMFS version of VM
var datastores=vm.datastore;
var datastoreVmfsVersion=datastores[0].info.vmfs.majorVersion;

var datastores = cluster.datastore;
var vmfsVersion;
var flag=0;
//Get Target Cluster VMFS version
for each(var ds in datastores){
	vmfsVersion = ds.info.vmfs.majorVersion;
	if(datastoreVmfsVersion <= vmfsVersion){
		flag=1;
		break;
	}
}
if (flag==0)
{
var error= "VMFS version for source VM's datastore is not compatible to Target Cluster.";
throw error;
}
System.log("VMFS version for Source VM's datastore is compatible to add to Target Cluster.");