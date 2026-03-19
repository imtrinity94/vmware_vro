/**
 * Upload and register Automation Orchestrator server public key on the target user@host.
This will enable future connections to use public key authentication instead of password authentication for this user.
 *
 * @param {string} host
 * @param {string} username
 * @param {SecureString} password
 * @param {Path} localPath
 * @param {string} remotePath
 */
//Auto generated script, cannot be modified !
System.getModule("com.vmware.library.ssh").registerVSOonHost(host,username,password,localPath,remotePath) ;