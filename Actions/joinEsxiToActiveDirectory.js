/**
 * Joins an ESXi host to an Active Directory domain
 * @author {your-name}
 * @version 1.0
 * 
 * @param {VC:HostSystem} host - The ESXi host object to join to Active Directory domain
 * @param {string} domainName - The Active Directory domain name to join (e.g., "company.com")
 * @param {string} userName - Active Directory user with permissions to join computers to the domain
 * @param {SecureString} password - Password for the Active Directory user
 * @returns {void}
 */

// Get the authentication manager from the vSphere host configuration
var authManager = host.configManager.authenticationManager;

// Iterate through all supported authentication stores on the host
for each (var store in authManager.supportedStore) {
    // Check if the store is an Active Directory authentication store
    // The store ID typically starts with "activeDirectoryAuthentication"
    if (store.id.match(/^activeDirectoryAuthentication/)) {
        // Join the ESXi host to the Active Directory domain
        store.joinDomain_Task(domainName, userName, password);
    }
}
