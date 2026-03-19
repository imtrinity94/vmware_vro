/**
 * Creates a user and sets a password for the user.
 *
 * @param {string} accountName - [object Object]
 * @param {SecureString} password - [object Object]
 * @param {SecureString} confirmPassword - [object Object]
 * @param {string} domainName - [object Object]
 * @param {string} displayName - [object Object]
 * @param {Any} container - [object Object]
 */
//Auto generated script, cannot be modified !
System.getModule("com.vmware.library.microsoft.activeDirectory").createUserWithPassword(accountName,password,confirmPassword,domainName,displayName,container) ;