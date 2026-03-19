/**
 * Change Usr CPG
 *
 * @param {StoreServ:Volume} vol
 * @param {StoreServ:CPG} usrCPG
 * @param {StoreServ:Connection} connection
 * @return {StoreServ:Task} task
 */
task = connection.changeUsrCPG(vol, usrCPG);
System.log("Task created with id " + task.taskId + " and status " + task.taskStatus);
System.log("Use queryTask action to poll for task completion");