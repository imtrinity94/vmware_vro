//System.log(Server.findAllForType("AutoDeploy:ADAnswerFile"));
System.log("ADHostProfile---------------------------");
var arr = Server.findAllForType("AutoDeploy:ADHostProfile");
for(var i =0; i < arr.length;  i++ ){
    System.log(arr[i].name);
}
System.log("AutoDeploy----------------------------");
arr = Server.findAllForType("AutoDeploy:AutoDeploy");
for(var i =0; i < arr.length;  i++ ){
    System.log(arr[i].name);
}
//System.log(Server.findAllForType("AutoDeploy:AutoDeployItem"));
//System.log(Server.findAllForType("AutoDeploy:autoDeployManager"));
//System.log(Server.findAllForType("AutoDeploy:CheckItemResult"));
System.log("DeployRule----------------------------------");
arr = Server.findAllForType("AutoDeploy:DeployRule");
for(var i =0; i < arr.length;  i++ ){
    System.log(arr[i].pxeProfileName + " - "+ arr[i].name);
}
System.log("SoftwareChannel-------------------------------");
arr = Server.findAllForType("AutoDeploy:SoftwareChannel");
for(var i =0; i < arr.length;  i++ ){
    System.log(arr[i].name);
}
System.log("SoftwareDepot-----------------------------");
arr = Server.findAllForType("AutoDeploy:SoftwareDepot");
for(var i =0; i < arr.length;  i++ ){
    System.log(arr[i].depotName);
}

System.log("SoftwareImageProfile-----------------------------");
arr = Server.findAllForType("AutoDeploy:SoftwareImageProfile"); // many
for(var i =0; i < arr.length;  i++ ){
    System.log(arr[i].name);
}
System.log("SoftwareVendor-----------------------------");
arr = Server.findAllForType("AutoDeploy:SoftwareVendor");
for(var i =0; i < arr.length;  i++ ){
    System.log(arr[i].name);
}

//System.log(Server.findAllForType("AutoDeploy:UserInputParameter"));
/*for(var i =0; i < arr.length;  i++ ){
    System.log(arr[i].depotName + " - "+ arr[i].depotURL);
}*/





-----------------------------------------------------------------------------------------------------------------------------------------------------------

autoDeployManager.reloadConfiguration();

adHost : AutoDeploy:AutoDeploy
esxHost : VC:HostSystem
esxHostItem = new AutoDeployItem(esxHost._getRef().type, esxHost._getRef().value);
adHost.clearAnswerFile(esxHostItem);
adHost.getAnswerFileStatus(esxHostItem);
adHost.getXmlAnswerFile(esxHostItem);

vcHost : VC:SdkConnection
autoDeployManager.findAutoDeployHostUri(vcHost.name);
autoDeployManager.addAutoDeployHost(vcHost.name);


autoDeployManager.removeAutoDeployHost(adHost);

sDepo : AutoDeploy:SoftwareDepot
sDepo = autoDeployManager.addSoftwareDepot(depotName string, depotURL string);
autoDeployManager.removeSoftwareDepot(depot);
autoDeployManager.updateSoftwareDepot(depot, depotName, depotURL);

var deployOptions = adHost.getDeployOptions();
if (deployOptions != null) {
    for(var i in deployOptions.keys) {
        var key = deployOptions.keys[i];
        System.log("key: " + key + " value: " + deployOptions.get(key));
    }
}

autoDeployManager.reloadConfiguration();
adHost.setDeployOption(key string, value string);

esxHosts : Array/AutoDeploy:AutoDeployItem
imageProfile : AutoDeploy:SoftwareImageProfile
adHost.applyImageProfile(esxHosts , imageProfile);


deployRule : AutoDeploy:DeployRule
autoDeployManager.getAutoDeploy(deployRule.getHostUri());
dHost.activateDeployRule(deployRule, position number);


adHost.activateWorkingSet();
adHost.addToWorkingSet(deployRule, position number);

hiddenRules : Array/AutoDeploy:DeployRule
var hiddenRules = adHost.getHiddenRules();
esxHost : AutoDeploy:AutoDeployItem
adHost.repairRuleSetCompliance(esxHost);
attributes = adHost.retrieveHostAttributes(esxHost);
for(var i in attributes.keys) {
    System.log("attribute: " + attributes.keys[i] + " value: " + attributes.get(attributes.keys[i]));
}


