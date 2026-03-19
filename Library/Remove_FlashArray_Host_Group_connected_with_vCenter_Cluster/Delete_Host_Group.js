/**
 * Delete Host Group
 *
 * @param {VC:ClusterComputeResource} cluster - [object Object]
 * @param {PS:FlashArrayConnection} faConnection - [object Object]
 * @return {string} hostGroupName
 */
if(!cluster) throw "'cluster' parameter should not be empty."
	
	
hostGroupName =  cluster.name.replace(/\W/g, '');
System.log("Host Group name to remove: " + hostGroupName);
