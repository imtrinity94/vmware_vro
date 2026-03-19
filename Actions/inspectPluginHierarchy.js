/**
 * Retrieves the default Active Directory host from the vRO plug-in hierarchy
 * by matching the default AD server ID from ConfigurationManager.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 *
 * @author Mayank Goyal
 * @returns {AD:AdHost|undefined} defaultAdHost - The default AD host object, or undefined if not found.
 */

var defaultAdServerUuid = ConfigurationManager.getPluginOptions().defaultAdServerId;

if (defaultAdServerUuid != null) {
    var adHostsList = Server.findAllForType("AD:AdHost");
    var i;
    for (i = 0; i < adHostsList.length; i++) {
        var currentAdHost = adHostsList[i];
        if (defaultAdServerUuid == currentAdHost.hostConfiguration.id) {
            System.debug("Matched default Active Directory host: " + currentAdHost.name);
            return currentAdHost;
        }
    }
}

System.warn("Default Active Directory host not found or not configured.");
return undefined;
