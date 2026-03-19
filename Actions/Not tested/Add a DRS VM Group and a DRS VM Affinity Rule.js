/**
 * Creates a DRS VM Group in a cluster and adds a VM to it. 
 * Also creates a DRS VM-Host affinity rule for that group.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {VC:ClusterComputeResource} objVcClusterComputeResource The cluster to reconfigure.
 * @param {VC:VirtualMachine} objVcVirtualMachine The VM to add to the group.
 * @param {string} strVmGroupName Base name for the VM group.
 * @param {string} strDataCenterName Datacenter name prefix.
 * @param {string} strDataCenterChoice Name of the host group for affinity.
 * @returns {VC:Task} The cluster reconfiguration task.
 */

var vmGroupName = strDataCenterName + " - " + strVmGroupName;

var arrVcVirtualMachine = new Array();
if (objVcVirtualMachine) {
    arrVcVirtualMachine.push(objVcVirtualMachine);
}

var objVcClusterVmGroup = new VcClusterVmGroup();
objVcClusterVmGroup.name = vmGroupName;
objVcClusterVmGroup.userCreated = true;
objVcClusterVmGroup.vm = arrVcVirtualMachine;

var objVcClusterGroupSpec = new VcClusterGroupSpec();
objVcClusterGroupSpec.info = objVcClusterVmGroup;
objVcClusterGroupSpec.operation = VcArrayUpdateOperation.add;

var arrVcClusterGroupSpec = new Array(); 
arrVcClusterGroupSpec.push(objVcClusterGroupSpec);

var objVcClusterVmHostRuleInfo = new VcClusterVmHostRuleInfo();
objVcClusterVmHostRuleInfo.enabled = true;
objVcClusterVmHostRuleInfo.mandatory = false;
objVcClusterVmHostRuleInfo.userCreated = true;
objVcClusterVmHostRuleInfo.name = strDataCenterName + " Affinity - " + strVmGroupName;
objVcClusterVmHostRuleInfo.affineHostGroupName = strDataCenterChoice;
objVcClusterVmHostRuleInfo.vmGroupName = vmGroupName;

var objVcClusterRuleSpec = new VcClusterRuleSpec();
objVcClusterRuleSpec.info = objVcClusterVmHostRuleInfo;
objVcClusterRuleSpec.operation = VcArrayUpdateOperation.add;

var arrVcClusterRulesSpec = new Array(objVcClusterRuleSpec);

var objVcClusterConfigSpecEx = new VcClusterConfigSpecEx();
objVcClusterConfigSpecEx.groupSpec = arrVcClusterGroupSpec;
objVcClusterConfigSpecEx.rulesSpec = arrVcClusterRulesSpec;

var objVcTask = objVcClusterComputeResource.reconfigureComputeResource_Task(objVcClusterConfigSpecEx, true);
return objVcTask;
