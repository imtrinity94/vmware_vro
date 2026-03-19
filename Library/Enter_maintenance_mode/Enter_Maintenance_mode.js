/**
 * Enter Maintenance mode
 *
 * @param {VC:HostSystem} host
 * @param {number} timeout
 * @param {boolean} evacuatePoweredOffVms
 * @param {string} vsanMode
 * @return {VC:Task} task
 */
var maintenanceSpec = new VcHostMaintenanceSpec();
maintenanceSpec.vsanMode = new VcVsanHostDecommissionMode();
maintenanceSpec.vsanMode.objectAction = vsanMode;

task = host.enterMaintenanceMode_Task(timeout, evacuatePoweredOffVms, maintenanceSpec);