/**
 * @description Retrieves all registered vCloud hosts from the vCloud plugin, logs into each,
 *              and returns the full list of host objects.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @returns {VclHost[]|null} An array of VclHost objects, or null if none are registered.
 */

var hosts = VclHostManager.getHostList();
if (hosts != null) {
    for (var i = 0; i < hosts.length; i++) {
        hosts[i].login();
    }
}
return hosts;
