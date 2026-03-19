/**
 * Scriptable task
 *
 * @param {string} vmUsername
 * @param {SecureString} vmPassword
 * @param {VC:VirtualMachine} vm
 * @return {Array/CompositeType(pid:number,name:string,owner:string,cmdLine:string,startTime:Date,endTime:Date,exitCode:number):GuestProcessInfoType} result
 */
var host = vm.sdkConnection;

var guestOperationsManager = host.guestOperationsManager;
var guestAuth = new VcNamePasswordAuthentication();
guestAuth.username = vmUsername;
guestAuth.password = vmPassword;

var processManager = guestOperationsManager.processManager;
var guestProcessInfo = processManager.listProcessesInGuest(vm , guestAuth , null);

result = new Array();
for (var p in guestProcessInfo) {
	var process = guestProcessInfo[p];
	var jsObj = { pid: process.pid, name: process.name, owner: process.owner, cmdLine: process.cmdLine,
				  startTime: process.startTime, endTime: process.endTime, exitCode: process.exitCode};
	result.push(jsObj);
}