/**
 * Register VM Configuration Details
 *
 * @param {Array/string} vmxs
 * @param {VC:VmFolder} vmFolder
 * @param {Array/VC:ResourcePool} resourcePooList
 * @param {VC:ClusterComputeResource} cluster - [object Object]
 * @param {VC:Datastore} datastore - [object Object]
 * @param {VC:VirtualMachine} vmName
 * @param {Array/string} path
 * @param {Array/string} name
 * @return {VC:ResourcePool} resourcePool
 * @return {Array/string} path
 * @return {Array/string} name
 * @return {VC:HostSystem} host
 * @return {VC:VmFolder} folder
 * @return {boolean} asTemplate
 */
var iPath = new Array();
var iName = new Array();
//To get six-digit Random Number.
while(true){
	var randomNo=Math.floor(Math.random() * 100000);
 	if(randomNo > 9999 && randomNo < 100000){
		break;
	}
}

if(!vmxs || vmxs == null || vmxs.length == 0)
{
	System.error("VMX File not found in this datastore " + datastore.name);
}
else{
if(!vmFolder || vmFolder == null)
{
	System.error("VM Folder not found.");
}
if(!resourcePooList || resourcePooList == null)
{
	System.error("Resource Pool not found.");
}
if(!vmName){
	for(var i = 0; i < vmxs.length ; i++)
	{
	
		iPath[i] = vmxs[i];
		var n = vmxs[i].lastIndexOf("/");
		var vm = vmxs[i].substring(n+1);
		var VMXName = vm.split(".");
		iName[i] = VMXName[0] +  "-" +  randomNo;
		
	}
}
else{
	for(var i=0; i< vmxs.length; i++){
		var VMXName = vmxs[i].split("]");
		var vmPath = vmName.config.files.vmPathName.split("]");
		if(VMXName[1] == vmPath[1]){
			iPath[0] = vmxs[i];
			iName[0] = vmName.name + "-" + randomNo;
			break;	
		}
	}
}
path = iPath;
name = iName;
folder = vmFolder;
resourcePool = resourcePooList[0];
hosts = cluster.host;
host = hosts[0];
asTemplate = false;
}

