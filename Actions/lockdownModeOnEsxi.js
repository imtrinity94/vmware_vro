/**
 * @description Enables or disables ESXi lockdown mode for all hosts in the vCenter inventory.
 *              The first loop enables Normal lockdown mode on any host not already locked down.
 *              The second loop disables lockdown on any host currently in Normal lockdown mode.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @returns {void}
 */

// Phase 1: Enable Normal lockdown mode on hosts not currently locked down
var allHostsSystemsList = System.getModule("com.vmware.library.vc.host").getAllHostSystems();
System.log("Initiating Lockdown Mode reinforcement across " + allHostsSystemsList.length + " hosts.");

var i;
for (i = 0; i < allHostsSystemsList.length; i++) {
    var hostObj = allHostsSystemsList[i];
    var currentLockdownValue = hostObj.config.lockdownMode.value;
    
    if (currentLockdownValue === "lockdownDisabled") {
        System.log("Action: Entering lockdown mode for host: " + hostObj.name);
        try {
            hostObj.enterLockdownMode();
        } catch (lockEx) {
            System.error("Failed to enable lockdown for " + hostObj.name + ": " + lockEx);
        }
    } else if (currentLockdownValue === "lockdownNormal") {
        System.debug("Host " + hostObj.name + " is already in Normal lockdown mode.");
    }
}

// Phase 2: Disable lockdown on hosts specifically in Normal lockdown mode 
// (Note: This logic as original seems to toggle or test both states sequentially)
var refreshedHostsList = System.getModule("com.vmware.library.vc.host").getAllHostSystems();

var j;
for (j = 0; j < refreshedHostsList.length; j++) {
    var hostToUnlock = refreshedHostsList[j];
    var lockdownState = hostToUnlock.config.lockdownMode.value;
    
    if (lockdownState === "lockdownNormal") {
        System.log("Action: Exiting lockdown mode for host: " + hostToUnlock.name);
        try {
            hostToUnlock.exitLockdownMode();
        } catch (unlockEx) {
            System.error("Failed to disable lockdown for " + hostToUnlock.name + ": " + unlockEx);
        }
    } else if (lockdownState === "lockdownDisabled") {
        System.debug("Host " + hostToUnlock.name + " is not in lockdown mode.");
    }
}

return null;
