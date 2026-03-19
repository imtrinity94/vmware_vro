/**
 * Delete dvPortgroup from dvSwitch
 *
 * @param {VC:DistributedVirtualPortgroup} dvPortgroup
 * @return {VC:Task} deleteDvPortgroupTask
 */
var deleteDvPortgroupTask = dvPortgroup.destroy_Task();