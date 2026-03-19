/**
 * @description Retrieves the default Active Directory host from the vRO plug-in hierarchy
 *              by matching the default AD server ID from ConfigurationManager.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @returns {AD:AdHost|undefined} The default AD host object, or undefined if not found.
 */

var defId = ConfigurationManager.getPluginOptions().defaultAdServerId;
if (defId != null) {
    var hosts = Server.findAllForType("AD:AdHost");
    for (idx in hosts) {
        var host = hosts[idx];
        if (defId == host.hostConfiguration.id) {
            return host;
        }
    }
}
