/**
 * Scriptable task
 *
 * @param {string} vmUsername
 * @param {SecureString} vmPassword
 * @param {VC:VirtualMachine} vm
 * @param {string} dirPath
 * @param {string} prefix
 * @param {string} suffix
 * @return {string} result
 */
var host = vm.sdkConnection;

var guestOperationsManager = host.guestOperationsManager;
var guestAuth = new VcNamePasswordAuthentication();
guestAuth.username = vmUsername;
guestAuth.password = vmPassword;

var fileManager = guestOperationsManager.fileManager;
result = fileManager.createTemporaryFileInGuest(vm , guestAuth , prefix, suffix, dirPath);