/**
 * Joins an ESXi host to an Active Directory domain.
 * Iterates through supported authentication stores to find the Active Directory store and triggers the join task.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @version 1.0
 * @param {VC:HostSystem} host The ESXi host object to join to the Active Directory domain.
 * @param {string} domainName The Active Directory domain name to join (e.g., "company.com").
 * @param {string} userName Active Directory user with permissions to join computers to the domain.
 * @param {SecureString} password Password for the Active Directory user.
 * @returns {void}
 */

// Get the authentication manager from the vSphere host configuration
var authManager = host.configManager.authenticationManager;

// Iterate through all supported authentication stores on the host
for each (var store in authManager.supportedStore) {
    // Check if the store is an Active Directory authentication store
    // The store ID typically starts with "activeDirectoryAuthentication"
    if (store.id && store.id.match(/^activeDirectoryAuthentication/)) {
        System.log("Found AD authentication store: " + store.id + ". Joining domain " + domainName);
        // Join the ESXi host to the Active Directory domain
        store.joinDomain_Task(domainName, userName, password);
    }
}
