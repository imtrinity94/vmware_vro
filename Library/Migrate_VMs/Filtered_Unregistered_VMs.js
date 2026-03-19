/**
 * Filtered Unregistered VMs
 *
 * @param {Array/VC:HostSystem} hosts
 * @param {Array/string} vmNames
 * @param {Array/string} vmStates
 * @param {Array/VC:ResourcePool} vmResourcePools
 * @param {Array/string} unregisteredVMList
 * @param {Array/string} sourcevmPath
 * @param {Array/VC:VmFolder} sourceVMFolders
 * @return {Array/string} sourceVMPaths
 * @return {Array/string} sourceStates
 * @return {Array/VC:ResourcePool} sourceResPool
 * @return {Array/string} sourceNames
 * @return {Array/VC:HostSystem} sourcehosts
 * @return {Array/VC:VmFolder} sourceFolders
 */
sourceVMPaths = [];
sourceResPool = [];
sourcehosts = [];
sourceNames = [];
sourceStates = [];
sourceFolders = [];
for(var i = 0; i < unregisteredVMList.length ; i++)
{
	for(var j = 0; j < vmNames.length ; j++)
	{
		if(unregisteredVMList[i].indexOf(vmNames[j])!= -1)
		{
			sourceVMPaths.push(sourcevmPath[j]);
			sourceResPool.push(vmResourcePools[j]);
			sourcehosts.push(hosts[j]);
			sourceNames.push(vmNames[j]);
			sourceStates.push(vmStates[j]);
			sourceFolders.push(sourceVMFolders[j]);
		}
	}
}
System.log("Source VMs to be registered back: " + sourceNames);	