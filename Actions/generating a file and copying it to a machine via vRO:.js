// Setup VM Connections 
var guestOperationsManager = vCVM.sdkConnection.guestOperationsManager;;
var fileManager = guestOperationsManager.fileManager;

// File Setup (Create temp file on vRO server) 
var vcoTempFile = System.createTempFile(vmname);
var fileContents = "";
System.log("Config file path: " + win_filepath);
var eol = "\n";

// Set fileContents 
for (var key in winfile) {
    if (typeof winfile[key] == "string") {
        System.debug("Setting " + key + "=" + winfile[key]);
        fileContents += key + "=" + winfile[key] + eol;
    }
}

// Write fileContents to temp file 
vcoTempFile.write(fileContents);

// Guest file parameter setup 
var fileSize = vcoTempFile.length;
var overwrite = true;
var guestFileAttributes;
guestFileAttributes = new VcGuestWindowsFileAttributes();

// Guest File Authentication Setup 
var guestAuthentication = new VcNamePasswordAuthentication();
guestAuthentication.username = win_local_admin guestAuthentication.password = win_local_admin_password guestAuthentication.interactiveSession = false;

// Guest File Transfer 
var guestFileUrl = fileManager.initiateFileTransferToGuest(vCVM, guestAuthentication, win_filepath, guestFileAttributes, fileSize, overwrite);
System.log("Guest file url: " + guestFileUrl);
var retVal = fileManager.putFile(vcoTempFile.path, guestFileUrl);
System.log("File transfer returned: " + retVal);

// Delete temp file on vRO server 
vcoTempFile.deleteFile();
//Here is an example of executing a script on a server using vRO:

opsMgr = vm.sdkConnection.guestOperationsManager; //fileMgr=opsMgr.fileManager; procMgr=opsMgr.processManager;

//authMgr=opsMgr.authManager; //auth=authMgr.acquireCredentialsInGuest();

auth = new VcNamePasswordAuthentication();
auth.username = guest_user auth.password = guest_password auth.interactiveSession = false;

spec = new VcGuestProgramSpec();
spec.arguments = commandArguments;
spec.programPath = commandToRun;

System.log("Will execute: '" + commandToRun + " " + commandArguments + "' as " + guest_user);
returnCode = procMgr.startProgramInGuest(vm, auth, spec);
