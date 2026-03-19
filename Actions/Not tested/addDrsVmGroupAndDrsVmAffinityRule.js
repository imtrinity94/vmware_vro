/**
 * Creates a DRS VM Group in a cluster and adds a VM to it. 
 * Also creates a DRS VM-Host affinity rule for that group.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {VC:ClusterComputeResource} targetClusterObj - The cluster to reconfigure.
 * @param {VC:VirtualMachine} targetVmObj - The VM to add to the group.
 * @param {string} baseGroupNameStr - Base name for the VM group.
 * @param {string} dcNamePrefixStr - Datacenter name prefix.
 * @param {string} hostGroupNameStr - Name of the host group for affinity.
 * @returns {VC:Task} reconfigTaskObj - The cluster reconfiguration task.
 */

var finalizedVmGroupName = dcNamePrefixStr + " - " + baseGroupNameStr;

var groupVmList = [];
if (targetVmObj) {
    groupVmList.push(targetVmObj);
}

// Define the VM Group
var vmGroupObj = new VcClusterVmGroup();
vmGroupObj.name = finalizedVmGroupName;
vmGroupObj.userCreated = true;
vmGroupObj.vm = groupVmList;

// Wrap in a Group Spec
var clusterGroupSpecObj = new VcClusterGroupSpec();
clusterGroupSpecObj.info = vmGroupObj;
clusterGroupSpecObj.operation = VcArrayUpdateOperation.add;

var groupSpecsArray = [clusterGroupSpecObj];

// Define the VM-to-Host Affinity Rule
var vmHostRuleInfoObj = new VcClusterVmHostRuleInfo();
vmHostRuleInfoObj.enabled = true;
vmHostRuleInfoObj.mandatory = false;
vmHostRuleInfoObj.userCreated = true;
vmHostRuleInfoObj.name = dcNamePrefixStr + " Affinity - " + baseGroupNameStr;
vmHostRuleInfoObj.affineHostGroupName = hostGroupNameStr;
vmHostRuleInfoObj.vmGroupName = finalizedVmGroupName;

// Wrap in a Rule Spec
var clusterRuleSpecObj = new VcClusterRuleSpec();
clusterRuleSpecObj.info = vmHostRuleInfoObj;
clusterRuleSpecObj.operation = VcArrayUpdateOperation.add;

var ruleSpecsArray = [clusterRuleSpecObj];

// Construct the Global Cluster Configuration Spec Extension
var configSpecExObj = new VcClusterConfigSpecEx();
configSpecExObj.groupSpec = groupSpecsArray;
configSpecExObj.rulesSpec = ruleSpecsArray;

System.log("Initiating cluster reconfiguration for DRS VM Group: " + finalizedVmGroupName);
var reconfigTaskObj = targetClusterObj.reconfigureComputeResource_Task(configSpecExObj, true);

return reconfigTaskObj;
