/**
 * @description Sets the DCUI (Direct Console User Interface) trusted users list and timeout
 *              on an ESXi host. Appends "root" to the trusted users and updates the DCUI
 *              timeout to 600 seconds.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {VC:HostSystem} host - The ESXi host to configure DCUI settings on.
 * @param {string[]} dcuiTrustedUsers - Array of usernames to add as DCUI trusted users.
 * @returns {void}
 */

// Set DCUI Trusted Users
// input host typeof(host : VC:HostSystem)
optionManager = host.configManager.advancedOption;
var trustedUsers = optionManager.queryOptions('DCUI.Access');
var userUpdate = "";

if (dcuiTrustedUsers.length > 0) {
    for (i = 0; i < dcuiTrustedUsers.length; i++) {
        userUpdate = userUpdate + dcuiTrustedUsers[i] + ",";
    }
    userUpdate = userUpdate + "root";
    trustedUsers[0].value = userUpdate;
    optionManager.updateOptions(trustedUsers);
}

// Set DCUI Timeout
optionManager = host.configManager.advancedOption;
var DcuiTimeout = optionManager.queryOptions('UserVars.DcuiTimeOut');

DcuiTimeout[0].value_IntValue = 600;

optionManager.updateOptions(DcuiTimeout);
