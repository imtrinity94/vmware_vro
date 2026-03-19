/**
 * Update Configuration
 *
 * @param {string} host
 * @param {number} port
 * @param {string} ldapBase
 * @param {boolean} useSSL
 * @param {string} defaultDomain
 * @param {string} sharedUserName
 * @param {SecureString} sharedUserPassword
 * @param {AD:AdHost} adServer
 * @param {boolean} subDomainAutoConnect
 * @param {string} name
 * @param {boolean} followReferrals
 * @param {number} connectTimeoutMillis
 * @param {string} loadBalancingMode
 * @param {Array/string} alternativeHosts
 * @param {string} bindType
 * @return {string} configId
 */

var configuration = adServer.hostConfiguration;
configuration.name = name;
configuration.host = host;
configuration.port = port;
configuration.ldapBase = ldapBase;
configuration.useSSL = useSSL;
configuration.defaultDomain = defaultDomain;
configuration.sharedUserName = sharedUserName;
configuration.sharedUserPassword = sharedUserPassword;
configuration.subDomainAutoConnect = subDomainAutoConnect;
configuration.followReferrals = followReferrals;
configuration.connectTimeoutMillis = connectTimeoutMillis;
if (loadBalancingMode!=null && loadBalancingMode!=""){
  configuration.loadBalancingMode = LdapLoadBalancingMode.fromString(loadBalancingMode);
}
if (bindType!=null && bindType!=""){
  configuration.bindType = LdapBindType.fromString(bindType);
}
configuration.alternativeHosts = alternativeHosts;


ConfigurationManager.validateConfiguration(configuration);
var configId = ConfigurationManager.saveConfiguration(configuration);
System.log("Configuration saved successfully.")
