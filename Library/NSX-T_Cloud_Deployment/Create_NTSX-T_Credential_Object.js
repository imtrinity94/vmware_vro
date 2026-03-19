/**
 * Add a note to the workflow schema.
 *
 * @param {Avi:AviVroClient} aviVroClient
 * @param {string} nsx_cred_name
 * @param {string} nsx_user
 * @param {SecureString} nsx_password
 * @return {string} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.avi").CreateNSXTCredentialObject(aviVroClient,nsx_cred_name,nsx_user,nsx_password);
