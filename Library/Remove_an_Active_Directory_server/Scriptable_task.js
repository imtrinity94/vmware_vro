/**
 * Scriptable task
 *
 * @param {AD:AdHost} adServer
 */
var propValue;
System.log("Deleting "  + adServer.name)
System.log("Configuration id "  + adServer.hostConfiguration.id)
ConfigurationManager.deleteConfiguration(adServer.hostConfiguration.id);