/**
 * Destroy folder
 *
 * @param {VC:HostFolder} folder
 * @return {VC:Task} task
 */
if (folder == null) 
	throw "Folder must be defined";
else
	task = folder.destroy_Task();