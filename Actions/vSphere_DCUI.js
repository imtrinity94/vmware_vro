/**
 * Configures DCUI (Direct Console User Interface) trusted users and timeout on an ESXi host.
 * Adds specified users to the DCUI access list and appends "root".
 * Sets the DCUI idle timeout to 600 seconds.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {VC:HostSystem} host The ESXi host to configure.
 * @param {string[]} dcuiTrustedUsers Array of usernames to add to the trusted list.
 * @returns {void}
 */

if (!host) {
    throw "No host provided";
}

var optionManager = host.configManager.advancedOption;

// Set DCUI Trusted Users
if (dcuiTrustedUsers && dcuiTrustedUsers.length > 0) {
    var trustedUsersResult = optionManager.queryOptions('DCUI.Access');
    var userUpdate = "";
    
    for (var i = 0; i < dcuiTrustedUsers.length; i++) {
        userUpdate += dcuiTrustedUsers[i] + ",";
    }
    userUpdate += "root";
    
    System.log("Updating DCUI.Access to: " + userUpdate);
    trustedUsersResult[0].value = userUpdate;
    optionManager.updateOptions(trustedUsersResult);
}

// Set DCUI Timeout
var dcuiTimeoutResult = optionManager.queryOptions('UserVars.DcuiTimeOut');
if (dcuiTimeoutResult && dcuiTimeoutResult.length > 0) {
    System.log("Updating UserVars.DcuiTimeOut to 600 seconds");
    dcuiTimeoutResult[0].value = 600; // Use .value for standard options, .value_IntValue is some plugins
    optionManager.updateOptions(dcuiTimeoutResult);
} else {
    System.warn("UserVars.DcuiTimeOut option not found on host: " + host.name);
}
