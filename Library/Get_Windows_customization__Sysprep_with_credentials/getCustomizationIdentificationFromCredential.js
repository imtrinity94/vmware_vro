/**
 * The Identification data object type provides information needed to join a workgroup or domain
 *
 * @param {string} domainAdmin - [object Object]
 * @param {SecureString} domainAdminUsername - [object Object]
 * @param {SecureString} domainAdminPassword - [object Object]
 * @param {string} joinDomain - [object Object]
 * @param {string} joinWorkgroup - [object Object]
 * @return {Any} actionResult
 */

if (!domainAdmin) {
    domainAdmin = new Credential(domainAdminUsername, domainAdminPassword);
}
actionResult = System.getModule("com.vmware.library.vc.vm.spec.identity").getCustomizationIdentificationFromCredential(domainAdmin,joinDomain,joinWorkgroup) ;