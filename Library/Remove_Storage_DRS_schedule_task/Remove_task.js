/**
 * Remove task
 *
 * @param {string} taskName
 * @param {VC:StoragePod} storagePod
 */
var tasks = storagePod.vimHost.scheduledTaskManager.scheduledTask;
var removed = false;
for (i in tasks) {
	if (tasks[i].info.name == taskName) {
		tasks[i].removeScheduledTask();
		System.log('Task ' + tasks[i] + ' removed');
		removed = true;
	}
}
if (!removed) {
	System.log('Task ' + taskName + ' not found');
}