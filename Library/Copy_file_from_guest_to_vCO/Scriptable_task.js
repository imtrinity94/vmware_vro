/**
 * Scriptable task
 *
 * @param {string} vmUsername
 * @param {SecureString} vmPassword
 * @param {VC:VirtualMachine} vm
 * @param {string} guestFilePath
 * @param {string} vcoPath
 * @return {boolean} result
 */
var host = vm.sdkConnection;

var guestOperationsManager = host.guestOperationsManager;
var guestAuth = new VcNamePasswordAuthentication();
guestAuth.username = vmUsername;
guestAuth.password = vmPassword;

var fileManager = guestOperationsManager.fileManager;
result = false;
var ftInfo = fileManager.initiateFileTransferFromGuest(vm , guestAuth ,guestFilePath);
result = fileManager.downloadFile(vcoPath, ftInfo);