/**
 * Sets the user password to the given password string.
 *
 * @param {AD:User} user
 * @param {SecureString} password
 * @return {AD:User} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.microsoft.activeDirectory").setUserPassword(user,password) ;