/**
 * Scriptable task
 *
 * @param {string} vmUsername
 * @param {SecureString} vmPassword
 * @param {VC:VirtualMachine} vm
 * @param {string} programPath
 * @param {string} arguments
 * @param {string} workingDirectory
 * @param {Array/string} environment
 * @param {boolean} interactiveSession
 * @return {number} result
 */
var host = vm.sdkConnection;

var guestOperationsManager = host.guestOperationsManager;
var guestAuth = new VcNamePasswordAuthentication();
guestAuth.username = vmUsername;
guestAuth.password = vmPassword;
guestAuth.interactiveSession = interactiveSession;

var guestProgramSpec = new VcGuestProgramSpec();
guestProgramSpec.programPath = programPath;
guestProgramSpec.arguments = arguments;
guestProgramSpec.workingDirectory = workingDirectory;
guestProgramSpec.envVariables = environment;

var processManager = guestOperationsManager.processManager;
result = processManager.startProgramInGuest(vm , guestAuth , guestProgramSpec);