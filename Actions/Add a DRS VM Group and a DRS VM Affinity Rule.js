var strVmGroupName;
	strVmGroupName = "VM Group Name";

var strDataCenterName;
	strDataCenterName = "Data Center Name";

var arrVcVirtualMachine;
 arrVcVirtualMachine = new Array();
 arrVcVirtualMachine.push(objVcVirtualMachine);

var objVcClusterVmGroup;
 objVcClusterVmGroup = new VcClusterVmGroup();
 objVcClusterVmGroup.name = strDataCenterName + " - " + strVmGroupName;
 objVcClusterVmGroup.userCreated = true;
 objVcClusterVmGroup.vm = arrVcVirtualMachine;

var objVcClusterGroupSpec;
 objVcClusterGroupSpec = new VcClusterGroupSpec();
 objVcClusterGroupSpec.info = objVcClusterVmGroup;
 objVcClusterGroupSpec.operation = VcArrayUpdateOperation.add;

var arrVcClusterGroupSpec;
 arrVcClusterGroupSpec = new Array(); 
 arrVcClusterGroupSpec.push(objVcClusterGroupSpec);

var objVcClusterVmHostRuleInfo;
 objVcClusterVmHostRuleInfo = new VcClusterVmHostRuleInfo();
 objVcClusterVmHostRuleInfo.enabled = true;
 objVcClusterVmHostRuleInfo.mandatory = false;
 objVcClusterVmHostRuleInfo.userCreated = true;
 objVcClusterVmHostRuleInfo.name = strDataCenterName + " Affinity - " + strVmGroupName;
 objVcClusterVmHostRuleInfo.affineHostGroupName = strDataCenterChoice;
 objVcClusterVmHostRuleInfo.vmGroupName = strDataCenterName + " - " + strVmGroupName;

var objVcClusterRuleSpec;
 objVcClusterRuleSpec = new VcClusterRuleSpec();
 objVcClusterRuleSpec.info = objVcClusterVmHostRuleInfo;
 objVcClusterRuleSpec.operation = VcArrayUpdateOperation.add;

var arrVcClusterRulesSpec;
 arrVcClusterRulesSpec = new Array(objVcClusterRuleSpec);

var objVcClusterConfigSpecEx;
 objVcClusterConfigSpecEx = new VcClusterConfigSpecEx();
 objVcClusterConfigSpecEx.groupSpec = arrVcClusterGroupSpec;
 objVcClusterConfigSpecEx.rulesSpec = arrVcClusterRulesSpec;

var objVcTask;
 objVcTask = objVcClusterComputeResource.reconfigureComputeResource_Task(objVcClusterConfigSpecEx, true);
