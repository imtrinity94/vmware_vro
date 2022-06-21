var addUpdateRule = new VcClusterVmHostRuleInfo();
addUpdateRule.name = ruleName;

if (type=="must"){
    addUpdateRule.mandatory = true;
    addUpdateRule.affineHostGroupName= hostGrpName;
    addUpdateRule.antiAffineHostGroupName =null;
}
if (type=="should"){
    addUpdateRule.mandatory = false;
    addUpdateRule.affineHostGroupName= hostGrpName;
    addUpdateRule.antiAffineHostGroupName =null;
}
if (type=="mustNot"){
    addUpdateRule.mandatory = true;
    addUpdateRule.affineHostGroupName= null;
    addUpdateRule.antiAffineHostGroupName =hostGrpName;
}
if (type=="shouldNot"){
    addUpdateRule.mandatory = false;
    addUpdateRule.affineHostGroupName= null;
    addUpdateRule.antiAffineHostGroupName =hostGrpName;
}

addUpdateRule.enabled = true;
addUpdateRule.userCreated = true;
addUpdateRule.vmGroupName = vmGrpName;
var MyVCClusterSpec = new VcClusterConfigSpecEx() ;
var MyVcClusterRulesSpec= new Array(); 
MyVcClusterRulesSpec[0] = new VcClusterRuleSpec();
MyVcClusterRulesSpec[0].operation =  VcArrayUpdateOperation.add;
MyVcClusterRulesSpec[0].info = addUpdateRule;
var MyVCClusterDRSConfigExSpec = new VcClusterConfigSpecEx() ;
MyVCClusterDRSConfigExSpec.drsConfig = new VcClusterDrsConfigInfo();
MyVCClusterDRSConfigExSpec.drsConfig.enabled = true;
MyVCClusterDRSConfigExSpec.rulesSpec = MyVcClusterRulesSpec;
MyVCClusterDRSConfigExSpec.rulesSpec[0].operation =  VcArrayUpdateOperation.add;

return cluster.reconfigureComputeResource_Task(MyVCClusterDRSConfigExSpec , true);
