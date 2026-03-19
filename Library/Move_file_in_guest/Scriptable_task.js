/**
 * Scriptable task
 *
 * @param {string} vmUsername
 * @param {SecureString} vmPassword
 * @param {VC:VirtualMachine} vm
 * @param {string} srcFilePath
 * @param {string} dstFilePath
 * @param {boolean} overwrite
 * @return {boolean} result
 */
var host = vm.sdkConnection;

var guestOperationsManager = host.guestOperationsManager;
var guestAuth = new VcNamePasswordAuthentication();
guestAuth.username = vmUsername;
guestAuth.password = vmPassword;

var fileManager = guestOperationsManager.fileManager;
result = false;
fileManager.moveFileInGuest(vm , guestAuth , srcFilePath, dstFilePath, overwrite);
result = true;