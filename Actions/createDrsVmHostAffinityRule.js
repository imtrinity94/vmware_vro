/**
 * @description Adds a DRS VM-to-Host affinity or anti-affinity rule to a vSphere cluster.
 *              Supports "must", "should", "mustNot", and "shouldNot" rule types.
 * @note JSDoc generated via Antigravity AI IDE and can be reasonably incorrect.
 *
 * @param {VC:ClusterComputeResource} cluster - The target cluster to apply the DRS rule to.
 * @param {string} ruleName - The name to assign to the new DRS rule.
 * @param {string} type - The rule type: "must", "should", "mustNot", or "shouldNot".
 * @param {string} hostGrpName - The name of the host group for affinity/anti-affinity.
 * @param {string} vmGrpName - The name of the VM group to associate with the rule.
 * @returns {VC:Task} The vCenter task object for the cluster reconfiguration.
 */

var ruleInfo = new VcClusterVmHostRuleInfo();
ruleInfo.name = ruleName;

if (type == "must") {
    ruleInfo.mandatory = true;
    ruleInfo.affineHostGroupName = hostGrpName;
    ruleInfo.antiAffineHostGroupName = null;
} else if (type == "should") {
    ruleInfo.mandatory = false;
    ruleInfo.affineHostGroupName = hostGrpName;
    ruleInfo.antiAffineHostGroupName = null;
} else if (type == "mustNot") {
    ruleInfo.mandatory = true;
    ruleInfo.affineHostGroupName = null;
    ruleInfo.antiAffineHostGroupName = hostGrpName;
} else if (type == "shouldNot") {
    ruleInfo.mandatory = false;
    ruleInfo.affineHostGroupName = null;
    ruleInfo.antiAffineHostGroupName = hostGrpName;
}

ruleInfo.enabled = true;
ruleInfo.userCreated = true;
ruleInfo.vmGroupName = vmGrpName;

var rulesSpecArray = new Array();
rulesSpecArray[0] = new VcClusterRuleSpec();
rulesSpecArray[0].operation = VcArrayUpdateOperation.add;
rulesSpecArray[0].info = ruleInfo;

var clusterConfigSpec = new VcClusterConfigSpecEx();
clusterConfigSpec.drsConfig = new VcClusterDrsConfigInfo();
clusterConfigSpec.drsConfig.enabled = true;
clusterConfigSpec.rulesSpec = rulesSpecArray;

var reconfigurationTask = cluster.reconfigureComputeResource_Task(clusterConfigSpec, true);

return reconfigurationTask;
