/**
 * @description Creates an empty vCloud vApp linked to a specified Org vDC network.
 *              Configures the vApp network in bridged mode, then waits for the compose task
 *              to complete before refreshing the vApp's internal state.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {VclOrgVdcNetwork} objVclOrgVdcNetwork - The Org vDC network to bridge the vApp to.
 * @param {VclVdc} objVclVdc - The virtual data center to create the vApp in.
 * @param {string} strVclVAppName - The name for the new vApp.
 * @param {string} strFullName - Full display name of the requester (used in vApp description).
 * @param {string} strUserName - Username of the requester (used in vApp description).
 * @param {*} objCustomActions - A module reference providing the waitVclTask helper method.
 * @returns {void}
 */

// The following script enables the creation of an Empty vCloud vApp and the linking of it to a virtual data center network.

var objVclSyslogServerSettings = new VclSyslogServerSettings();

var objVclNetworkConfiguration = new VclNetworkConfiguration();
objVclNetworkConfiguration.ipScope = null;
objVclNetworkConfiguration.ipScopes = objVclOrgVdcNetwork.configuration.ipScopes;
objVclNetworkConfiguration.parentNetwork = objVclOrgVdcNetwork.getReference();
objVclNetworkConfiguration.fenceMode = "bridged";
objVclNetworkConfiguration.features = null;
objVclNetworkConfiguration.routerInfo = null;
objVclNetworkConfiguration.backwardCompatibilityMode = false;
objVclNetworkConfiguration.retainNetInfoAcrossDeployments = false;
objVclNetworkConfiguration.syslogServerSettings = objVclSyslogServerSettings;

var objVclVAppNetworkConfiguration = new VclVAppNetworkConfiguration();
objVclVAppNetworkConfiguration.configuration = objVclNetworkConfiguration;
objVclVAppNetworkConfiguration.description = objVclOrgVdcNetwork.name;
objVclVAppNetworkConfiguration.networkName = objVclOrgVdcNetwork.name;
objVclVAppNetworkConfiguration.isDeployed = true;

var objVclNetworkConfigSection = new VclNetworkConfigSection();
objVclNetworkConfigSection.info = new VclMsg();
objVclNetworkConfigSection.info.value = "NetworkConfigSection";
objVclNetworkConfigSection.networkConfig.add(objVclVAppNetworkConfiguration);

var objVclInstantiationParams = new VclInstantiationParams();
objVclInstantiationParams.section.add(objVclNetworkConfigSection);

var objVclComposeVAppParams = new VclComposeVAppParams();
objVclComposeVAppParams.name = strVclVAppName;
objVclComposeVAppParams.description = "vCO Deployed vApp - " + strFullName + " (" + strUserName + ")";
objVclComposeVAppParams.deploy = false;
objVclComposeVAppParams.powerOn = false;
objVclComposeVAppParams.allEULAsAccepted = true;
objVclComposeVAppParams.linkedClone = true;
objVclComposeVAppParams.instantiationParams = objVclInstantiationParams;

var objVclVApp = objVclVdc.composeVApp(objVclComposeVAppParams);

var objVclTasksInProgress = objVclVApp.tasks;

if (objVclTasksInProgress != null) {
    var arrVclTask = objVclTasksInProgress.getTasks();

    var objVclTask = arrVclTask[0];

    objCustomActions.waitVclTask(objVclTask);
}

objVclVApp.updateInternalState();
