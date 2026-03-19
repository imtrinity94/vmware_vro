/**
 * checking VMFS version compatiablity
 *
 * @param {VC:Datastore} datastore
 * @param {VC:ClusterComputeResource} cluster
 */
//Get datastore VMFS version 
var datastoreVmfsVersion=datastore.info.vmfs.majorVersion;
System.log("The datastore VMFS version: "+datastoreVmfsVersion);
if(datastoreVmfsVersion == 6){
	var hosts = cluster.host;
	var esxiVersion;
	var flag=0;
//Get Target Cluster VMFS version
	for each(var host in hosts){
		esxiVersion = host.config.product.version;
		if(esxiVersion.indexOf("6.5")!=-1){
			flag=1;
			break;
		}
	}
	if (flag==0){
		var error= "VMFS version for existing datastore is not compatible to Target Cluster.";
		throw error;
	}
}
System.log("VMFS version for existing datastore is compatible to add to Target Cluster.");