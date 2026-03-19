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
 * @param {boolean} useSharedSession - [object Object]
 */
var configuration = new AD_ServerConfiguration();
configuration.host = host;
configuration.port = port;
configuration.ldapBase = ldapBase;
configuration.useSSL = useSSL;
configuration.defaultDomain = defaultDomain;
configuration.sharedUserName = sharedUserName;
configuration.sharedUserPassword = sharedUserPassword;
configuration.subDomainAutoConnect = true;

ConfigurationManager.validateConfiguration(configuration);
ConfigurationManager.updateConfiguration(configuration);

System.warn("This workflow is depreacted. Please consider using 'Add an Acive Direcotry server'.")
