/**
 * Convert Volume
 *
 * @param {StoreServ:Volume} vol
 * @param {string} type
 * @param {StoreServ:CPG} usrCPG
 * @param {string} keepVV
 * @param {StoreServ:Connection} connection
 * @param {boolean} compression
 * @return {StoreServ:Task} task
 */
task = connection.convertVolume(vol, type, usrCPG, keepVV,compression);
System.log("Task created with id " + task.taskId + " and status " + task.taskStatus);
System.log("Use queryTask action to poll for task completion");