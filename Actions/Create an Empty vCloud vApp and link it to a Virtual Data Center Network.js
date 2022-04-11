The following script enables the creation of an Empty vCloud vApp and the linking of it to a virtual data center network.

 

 

 

 

var objVclSyslogServerSettings;
	objVclSyslogServerSettings = new VclSyslogServerSettings();

var objVclNetworkConfiguration;
	objVclNetworkConfiguration = new VclNetworkConfiguration();
	objVclNetworkConfiguration.ipScope = null;
	objVclNetworkConfiguration.ipScopes = objVclOrgVdcNetwork.configuration.ipScopes;
	objVclNetworkConfiguration.parentNetwork = objVclOrgVdcNetwork.getReference();
	objVclNetworkConfiguration.fenceMode = "bridged";
	objVclNetworkConfiguration.features = null;
	objVclNetworkConfiguration.routerInfo = null;
	objVclNetworkConfiguration.backwardCompatibilityMode = false;
	objVclNetworkConfiguration.retainNetInfoAcrossDeployments = false;
	objVclNetworkConfiguration.syslogServerSettings = objVclSyslogServerSettings;

var objVclVAppNetworkConfiguration;
	objVclVAppNetworkConfiguration = new VclVAppNetworkConfiguration();
	objVclVAppNetworkConfiguration.configuration = objVclNetworkConfiguration;
	objVclVAppNetworkConfiguration.description = objVclOrgVdcNetwork.name;
	objVclVAppNetworkConfiguration.networkName = objVclOrgVdcNetwork.name;
	objVclVAppNetworkConfiguration.isDeployed = true;

var objVclNetworkConfigSection;
	objVclNetworkConfigSection = new VclNetworkConfigSection();
	objVclNetworkConfigSection.info = new VclMsg();
	objVclNetworkConfigSection.info.value = "NetworkConfigSection";
	objVclNetworkConfigSection.networkConfig.add(objVclVAppNetworkConfiguration);

var objVclInstantiationParams;
	objVclInstantiationParams = new VclInstantiationParams()
	objVclInstantiationParams.section.add(objVclNetworkConfigSection);

var objVclComposeVAppParams;
	objVclComposeVAppParams = new VclComposeVAppParams();
	objVclComposeVAppParams.name = strVclVAppName;
	objVclComposeVAppParams.description = "vCO Deployed vApp - " + strFullName + " (" + strUserName + ")";
	objVclComposeVAppParams.deploy = false;
	objVclComposeVAppParams.powerOn = false;
	objVclComposeVAppParams.allEULAsAccepted = true;
	objVclComposeVAppParams.linkedClone = true;
	objVclComposeVAppParams.instantiationParams = objVclInstantiationParams;

var objVclVApp;
	objVclVApp = objVclVdc.composeVApp(objVclComposeVAppParams);

var objVclTasksInProgress;
	objVclTasksInProgress =  objVclVApp.tasks;

if (objVclTasksInProgress != null)
{
	var arrVclTask;
		arrVclTask = objVclTasksInProgress.getTasks();

	var objVclTask;
		objVclTask = arrVclTask[0];

	objCustomActions.waitVclTask(objVclTask);
}

objVclVApp.updateInternalState();
