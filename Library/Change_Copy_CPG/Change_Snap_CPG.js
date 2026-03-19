/**
 * Change Snap CPG
 *
 * @param {StoreServ:Connection} connection
 * @param {StoreServ:Volume} vol
 * @param {StoreServ:CPG} snapCPG
 * @return {StoreServ:Task} task
 */
task = connection.changeSnapCPG(vol, snapCPG);
System.log("Task created with id " + task.taskId + " and status " + task.taskStatus);
System.log("Use queryTask action to poll for task completion");
