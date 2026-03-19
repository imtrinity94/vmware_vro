/**
 * Scriptable task
 *
 * @param {SSH:Host} sshHost - [object Object]
 * @param {string} rootFolder - [object Object]
 * @return {SSH:Host} updatedSshHost - [object Object]
 */
updatedSshHost = SSHHostManager.addRootFolderToHost(sshHost, rootFolder);