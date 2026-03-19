/**
 * Sets the ChangePasswordAtNextLogon property for the given user.
 *
 * @param {AD:User} user
 * @param {boolean} changePasswordAtNextLogon
 * @return {AD:User} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.microsoft.activeDirectory").setChangePasswordAtNextLogon(user,changePasswordAtNextLogon) ;