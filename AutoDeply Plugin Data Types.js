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


