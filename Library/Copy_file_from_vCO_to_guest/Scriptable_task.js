/**
 * Scriptable task
 *
 * @param {string} vmUsername
 * @param {SecureString} vmPassword
 * @param {VC:VirtualMachine} vm
 * @param {string} guestFilePath
 * @param {string} vcoPath
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
var attr = new VcGuestFileAttributes();
var srcFile = new File(vcoPath);
var uri = fileManager.initiateFileTransferToGuest(vm , guestAuth ,guestFilePath, attr, srcFile.length, overwrite);
result = fileManager.putFile(vcoPath, uri);