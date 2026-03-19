/**
 * Configures DCUI (Direct Console User Interface) trusted users and timeout on an ESXi host.
 * Adds specified users to the DCUI access list and appends "root".
 * Sets the DCUI idle timeout to 600 seconds.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {VC:HostSystem} hostObj - The ESXi host to configure.
 * @param {string[]} trustedUserList - Array of usernames to add to the trusted list.
 * @returns {void}
 */

if (!hostObj) {
    throw "Target host is mandatory for DCUI configuration.";
}

var hostConfigManager = hostObj.configManager;
var advancedOptionSvc = hostConfigManager.advancedOption;

System.log("Initiating DCUI Security Hardening on host: " + hostObj.name);

// Phase 1: Configure DCUI.Access whitelisting
if (trustedUserList && trustedUserList.length > 0) {
    var dcuiAccessOptions = advancedOptionSvc.queryOptions('DCUI.Access');
    
    if (dcuiAccessOptions && dcuiAccessOptions.length > 0) {
        var mergedUsersCsv = "";
        
        var i;
        for (i = 0; i < trustedUserList.length; i++) {
            mergedUsersCsv += trustedUserList[i] + ",";
        }
        
        // Ensure root maintains access
        mergedUsersCsv += "root";
        
        System.log("Updating DCUI.Access whitelist: " + mergedUsersCsv);
        dcuiAccessOptions[0].value = mergedUsersCsv;
        
        try {
            advancedOptionSvc.updateOptions(dcuiAccessOptions);
            System.log("DCUI.Access whitelist updated successfully.");
        } catch (updateEx) {
            System.error("Failed to commit DCUI.Access update: " + updateEx);
        }
    } else {
        System.warn("Advanced option 'DCUI.Access' was not returned by host query.");
    }
}

// Phase 2: Configure DCUI Idle Timeout
var timeoutOptions = advancedOptionSvc.queryOptions('UserVars.DcuiTimeOut');
if (timeoutOptions && timeoutOptions.length > 0) {
    var TARGET_TIMEOUT_SEC = 600;
    System.log("Setting UserVars.DcuiTimeOut to mandatory value: " + TARGET_TIMEOUT_SEC + " seconds");
    
    timeoutOptions[0].value = TARGET_TIMEOUT_SEC;
    
    try {
        advancedOptionSvc.updateOptions(timeoutOptions);
        System.log("DCUI Timeout configuration finalized.");
    } catch (timeoutEx) {
        System.error("Failed to committed DCUI Timeout update: " + timeoutEx);
    }
} else {
    System.warn("Advanced option 'UserVars.DcuiTimeOut' not found. This might be an unsupported ESXi version or license level.");
}

return null;
