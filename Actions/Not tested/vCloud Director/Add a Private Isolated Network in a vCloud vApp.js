var objVclIpRange;
	objVclIpRange = new VclIpRange();
	objVclIpRange.startAddress = "192.168.2.2";
	objVclIpRange.endAddress = "192.168.2.254";

var objVclIpRanges;
	objVclIpRanges = new VclIpRanges();
	objVclIpRanges.ipRange.add(objVclIpRange);

var objVclIpScope;
	objVclIpScope = new VclIpScope();
	objVclIpScope.gateway = "192.168.2.1";
	objVclIpScope.netmask = "255.255.255.0";
	objVclIpScope.ipRanges = objVclIpRanges;
	objVclIpScope.dns1 = "";
	objVclIpScope.dns2 = "";
	objVclIpScope.dnsSuffix = "";
	objVclIpScope.allocatedIpAddresses = null;
	objVclIpScope.subAllocations = null;
	objVclIpScope.isEnabled = true;
	objVclIpScope.isInherited = false;

var objVclIpScopes;
	objVclIpScopes = new VclIpScopes();
	objVclIpScopes.ipScope.add(objVclIpScope);

var objVclNetworkConfigurationPRIVATE;
	objVclNetworkConfigurationPRIVATE = new VclNetworkConfiguration();
	objVclNetworkConfigurationPRIVATE.syslogServerSettings = objVclSyslogServerSettings;
	objVclNetworkConfigurationPRIVATE.ipScope = objVclIpScope;
	objVclNetworkConfigurationPRIVATE.ipScopes = objVclIpScopes;
	objVclNetworkConfigurationPRIVATE.fenceMode = "isolated";
	objVclNetworkConfigurationPRIVATE.features = null;
	objVclNetworkConfigurationPRIVATE.routerInfo = null;
	objVclNetworkConfigurationPRIVATE.backwardCompatibilityMode = false;
	objVclNetworkConfigurationPRIVATE.retainNetInfoAcrossDeployments = false;
	objVclNetworkConfigurationPRIVATE.parentNetwork = null;

var objVclVAppNetworkConfigurationPRIVATE;
	objVclVAppNetworkConfigurationPRIVATE = new VclVAppNetworkConfiguration();
	objVclVAppNetworkConfigurationPRIVATE.configuration = objVclNetworkConfigurationPRIVATE;
	objVclVAppNetworkConfigurationPRIVATE.description = "PRIVATE-vApp-Network";
	objVclVAppNetworkConfigurationPRIVATE.networkName = "PRIVATE-vApp-Network";
	objVclVAppNetworkConfigurationPRIVATE.isDeployed = true;

objVclNetworkConfigSection.networkConfig.add(objVclVAppNetworkConfigurationPRIVATE);
