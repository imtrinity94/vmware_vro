/**
 * Move host
 *
 * @param {VC:HostSystem} host
 * @param {VC:HostFolder} folder
 * @return {VC:Task} task
 */
var array = new Array();
array.push(host);
task = folder.moveIntoFolder_Task(array);