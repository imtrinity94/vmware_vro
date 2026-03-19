/**
 * Delete distributed virtual switch
 *
 * @param {VC:VmwareDistributedVirtualSwitch} dvSwitch
 * @return {VC:Task} task
 */
var destroyDvSwitchTask = dvSwitch.destroy_Task();

task = destroyDvSwitchTask;
//wait for finish
//System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(destroyDvSwitchTask, true, 3);