/**
 * Scriptable task
 *
 * @param {string} vmUsername
 * @param {SecureString} vmPassword
 * @param {VC:VirtualMachine} vm
 * @param {string} path
 * @param {number} resultLimit
 * @return {Array/CompositeType(path:string,type:string,size:number):VcGuestFileInfoType} result
 */
var host = vm.sdkConnection;

var guestOperationsManager = host.guestOperationsManager;
var guestAuth = new VcNamePasswordAuthentication();
guestAuth.username = vmUsername;
guestAuth.password = vmPassword;

var guestListFileInfo = guestOperationsManager.fileManager.listFilesInGuest(vm , guestAuth ,
																		 path , 0 , resultLimit , ".*");
result = new Array();
for (var f in guestListFileInfo.files) {
	var file = guestListFileInfo.files[f];
	var jsObj = { path: file.path, type: file.type, size: file.size};
	result.push(jsObj);
}