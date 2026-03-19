/**
 * Add a note to the workflow schema.
 *
 * @param {Avi:AviVroClient} aviVroClient
 * @param {string} vcenter_cred_name
 * @param {string} vCenter_user
 * @param {SecureString} vCenter_password
 * @return {string} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.avi").CreatevCenterCredentialObject(aviVroClient,vcenter_cred_name,vCenter_user,vCenter_password);
