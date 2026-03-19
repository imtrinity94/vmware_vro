/**
 * Retrieves the default Active Directory host from the vRO plug-in hierarchy
 * by matching the default AD server ID from ConfigurationManager.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 *
 * @author Mayank Goyal
 * @returns {AD:AdHost|undefined} The default AD host object, or undefined if not found.
 */

var defId = ConfigurationManager.getPluginOptions().defaultAdServerId;
if (defId != null) {
    var hosts = Server.findAllForType("AD:AdHost");
    for (var idx in hosts) {
        var host = hosts[idx];
        if (defId == host.hostConfiguration.id) {
            return host;
        }
    }
}
return undefined;
