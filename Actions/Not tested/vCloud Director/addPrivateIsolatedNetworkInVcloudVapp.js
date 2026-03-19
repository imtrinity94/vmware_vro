/**
 * @description Configures and adds a private isolated network to a vCloud vApp network configuration section.
 *              Initializes IP ranges, scopes, and network configuration with isolated fence mode.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {VclNetworkConfigSection} vcloudNetworkConfigSection - The vApp's network configuration section to update.
 * @param {VclSyslogServerSettings} [syslogSettingsObj] - Optional syslog settings for the network.
 * @returns {void}
 */

// Phase 1: Define IP Addressing Range
var ipRangeItem = new VclIpRange();
ipRangeItem.startAddress = "192.168.2.2";
ipRangeItem.endAddress = "192.168.2.254";

var ipRangesCollection = new VclIpRanges();
ipRangesCollection.ipRange.add(ipRangeItem);

// Phase 2: Configure IP Scope (Gateway, Mask, Ranges)
var primaryIpScope = new VclIpScope();
primaryIpScope.gateway = "192.168.2.1";
primaryIpScope.netmask = "255.255.255.0";
primaryIpScope.ipRanges = ipRangesCollection;
primaryIpScope.dns1 = "";
primaryIpScope.dns2 = "";
primaryIpScope.dnsSuffix = "";
primaryIpScope.allocatedIpAddresses = null;
primaryIpScope.subAllocations = null;
primaryIpScope.isEnabled = true;
primaryIpScope.isInherited = false;

var ipScopesCollection = new VclIpScopes();
ipScopesCollection.ipScope.add(primaryIpScope);

// Phase 3: Construct Private Network Configuration
var isolationNetConfig = new VclNetworkConfiguration();
isolationNetConfig.syslogServerSettings = syslogSettingsObj || null;
isolationNetConfig.ipScope = primaryIpScope;
isolationNetConfig.ipScopes = ipScopesCollection;
isolationNetConfig.fenceMode = "isolated";
isolationNetConfig.features = null;
isolationNetConfig.routerInfo = null;
isolationNetConfig.backwardCompatibilityMode = false;
isolationNetConfig.retainNetInfoAcrossDeployments = false;
isolationNetConfig.parentNetwork = null;

// Phase 4: Construct vApp-level Network Configuration Wrapper
var vappNetConfigWrapper = new VclVAppNetworkConfiguration();
vappNetConfigWrapper.configuration = isolationNetConfig;
vappNetConfigWrapper.description = "PRIVATE-vApp-Network";
vappNetConfigWrapper.networkName = "PRIVATE-vApp-Network";
vappNetConfigWrapper.isDeployed = true;

// Commit to the parent network configuration section
System.log("Appending isolated network configuration 'PRIVATE-vApp-Network' to vApp section.");
vcloudNetworkConfigSection.networkConfig.add(vappNetConfigWrapper);

return null;
