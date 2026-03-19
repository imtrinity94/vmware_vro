/**
 * @description Adds a DRS VM-to-Host affinity or anti-affinity rule to a vSphere cluster.
 *              Supports "must", "should", "mustNot", and "shouldNot" rule types.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {VC:ClusterComputeResource} cluster - The target cluster to apply the DRS rule to.
 * @param {string} ruleName - The name to assign to the new DRS rule.
 * @param {string} type - The rule type: "must", "should", "mustNot", or "shouldNot".
 * @param {string} hostGrpName - The name of the host group for affinity/anti-affinity.
 * @param {string} vmGrpName - The name of the VM group to associate with the rule.
 * @returns {VC:Task} The vCenter task object for the cluster reconfiguration.
 */

var addUpdateRule = new VcClusterVmHostRuleInfo();
addUpdateRule.name = ruleName;

if (type == "must") {
    addUpdateRule.mandatory = true;
    addUpdateRule.affineHostGroupName = hostGrpName;
    addUpdateRule.antiAffineHostGroupName = null;
}
if (type == "should") {
    addUpdateRule.mandatory = false;
    addUpdateRule.affineHostGroupName = hostGrpName;
    addUpdateRule.antiAffineHostGroupName = null;
}
if (type == "mustNot") {
    addUpdateRule.mandatory = true;
    addUpdateRule.affineHostGroupName = null;
    addUpdateRule.antiAffineHostGroupName = hostGrpName;
}
if (type == "shouldNot") {
    addUpdateRule.mandatory = false;
    addUpdateRule.affineHostGroupName = null;
    addUpdateRule.antiAffineHostGroupName = hostGrpName;
}

addUpdateRule.enabled = true;
addUpdateRule.userCreated = true;
addUpdateRule.vmGroupName = vmGrpName;

var MyVCClusterSpec = new VcClusterConfigSpecEx();
var MyVcClusterRulesSpec = new Array();
MyVcClusterRulesSpec[0] = new VcClusterRuleSpec();
MyVcClusterRulesSpec[0].operation = VcArrayUpdateOperation.add;
MyVcClusterRulesSpec[0].info = addUpdateRule;

var MyVCClusterDRSConfigExSpec = new VcClusterConfigSpecEx();
MyVCClusterDRSConfigExSpec.drsConfig = new VcClusterDrsConfigInfo();
MyVCClusterDRSConfigExSpec.drsConfig.enabled = true;
MyVCClusterDRSConfigExSpec.rulesSpec = MyVcClusterRulesSpec;
MyVCClusterDRSConfigExSpec.rulesSpec[0].operation = VcArrayUpdateOperation.add;

return cluster.reconfigureComputeResource_Task(MyVCClusterDRSConfigExSpec, true);
