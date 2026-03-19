/**
 * Retrieves all registered vCloud hosts from the vCloud plugin, logs into each,
 * and returns the full list of host objects.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @returns {VclHost[]|null} An array of VclHost objects, or null if none are registered.
 */

var hosts = VclHostManager.getHostList();
if (hosts != null) {
    for (var i = 0; i < hosts.length; i++) {
        System.log("Logging into vCloud host: " + hosts[i].name);
        hosts[i].login();
    }
} else {
    System.warn("No vCloud hosts found in VclHostManager.");
}

return hosts;
