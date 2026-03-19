/**
 * The Identification data object type provides information needed to join a workgroup or domain
 *
 * @param {string} domainAdmin - [object Object]
 * @param {Any} domainAdminPassword - [object Object]
 * @param {string} joinDomain - [object Object]
 * @param {string} joinWorkgroup - [object Object]
 * @return {Any} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.vc.vm.spec.identity").getCustomizationIdentification(domainAdmin,domainAdminPassword,joinDomain,joinWorkgroup) ;