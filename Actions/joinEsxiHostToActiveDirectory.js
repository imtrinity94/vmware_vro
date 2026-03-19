/**
 * Joins an ESXi host to an Active Directory domain.
 * Iterates through supported authentication stores to find the Active Directory store and triggers the join task.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @version 1.0
 * @param {VC:HostSystem} vCenterHost - The ESXi host object to join to the Active Directory domain.
 * @param {string} targetDomainName - The Active Directory domain name to join (e.g., "company.com").
 * @param {string} adAdminUsername - Active Directory user with permissions to join computers to the domain.
 * @param {SecureString} adAdminPassword - Password for the Active Directory user.
 * @returns {void}
 */

// Access the authentication manager for the host
var authenticationManager = vCenterHost.configManager.authenticationManager;
var supportedStoresList = authenticationManager.supportedStore;

System.log("Evaluating supported authentication stores on host: " + vCenterHost.name);

var i;
for (i = 0; i < supportedStoresList.length; i++) {
    var authStore = supportedStoresList[i];
    
    // Identify the Active Directory authentication store
    if (authStore.id && authStore.id.indexOf("activeDirectoryAuthentication") === 0) {
        System.log("Matched AD authentication store: " + authStore.id);
        System.log("Initiating domain join for '" + targetDomainName + "' using account '" + adAdminUsername + "'");
        
        try {
            // Initiate the domain join task
            authStore.joinDomain_Task(targetDomainName, adAdminUsername, adAdminPassword);
        } catch (joinEx) {
            System.error("Failed to trigger domain join task for host " + vCenterHost.name + ": " + joinEx);
        }
    }
}

return null;
