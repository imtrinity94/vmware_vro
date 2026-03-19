/**
 * Avi_UserPasswordChange
 *
 * @param {Avi:AviVroClient} avivroClient - [object Object]
 * @param {string} username - [object Object]
 * @param {SecureString} current_password - [object Object]
 * @param {SecureString} new_password - [object Object]
 * @return {string} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.avi").Avi_UserPasswordChange(avivroClient,username,current_password,new_password) ;