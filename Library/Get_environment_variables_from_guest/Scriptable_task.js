/**
 * Scriptable task
 *
 * @param {string} vmUsername
 * @param {SecureString} vmPassword
 * @param {VC:VirtualMachine} vm
 * @param {Array/string} names
 * @param {boolean} interactiveSession
 * @return {Array/string} result
 */
var host = vm.sdkConnection;

var guestOperationsManager = host.guestOperationsManager;
var guestAuth = new VcNamePasswordAuthentication();
guestAuth.username = vmUsername;
guestAuth.password = vmPassword;

var processManager = guestOperationsManager.processManager;
result = processManager.readEnvironmentVariableInGuest(vm , guestAuth , names);