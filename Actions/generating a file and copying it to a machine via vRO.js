/**
 * Generates a configuration file on the vRO server and transfers it to a guest Windows VM.
 * Also includes a snippet for starting a program in the guest VM.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {VC:VirtualMachine} vCVM The target virtual machine.
 * @param {string} vmname Name of the VM (used for temp file naming).
 * @param {string} win_filepath The destination file path on the guest VM.
 * @param {Properties} winfile A properties object containing key-value pairs for the config file.
 * @param {string} win_local_admin Local admin username for the guest VM.
 * @param {SecureString} win_local_admin_password Local admin password for the guest VM.
 * @returns {void}
 */

// Setup VM Connections 
var guestOperationsManager = vCVM.sdkConnection.guestOperationsManager;
var fileManager = guestOperationsManager.fileManager;

// File Setup (Create temp file on vRO server) 
var vcoTempFile = System.createTempFile(vmname);
var fileContents = "";
System.log("Config file path in Guest: " + win_filepath);
var eol = "\n";

// Set fileContents from input properties
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
var guestFileAttributes = new VcGuestWindowsFileAttributes();

// Guest File Authentication Setup 
var guestAuthentication = new VcNamePasswordAuthentication();
guestAuthentication.username = win_local_admin;
guestAuthentication.password = win_local_admin_password;
guestAuthentication.interactiveSession = false;

// Guest File Transfer 
try {
    var guestFileUrl = fileManager.initiateFileTransferToGuest(vCVM, guestAuthentication, win_filepath, guestFileAttributes, fileSize, overwrite);
    System.log("Guest file url: " + guestFileUrl);
    var retVal = fileManager.putFile(vcoTempFile.path, guestFileUrl);
    System.log("File transfer returned: " + retVal);
} catch (ex) {
    System.error("File transfer failed: " + ex);
} finally {
    // Delete temp file on vRO server 
    vcoTempFile.deleteFile();
}

/*
 * Note: The following snippet for executing a program in guest is provided for reference.
 */

/*
var procMgr = guestOperationsManager.processManager;
var auth = new VcNamePasswordAuthentication();
auth.username = guest_user;
auth.password = guest_password;
auth.interactiveSession = false;

var spec = new VcGuestProgramSpec();
spec.arguments = commandArguments;
spec.programPath = commandToRun;

System.log("Will execute: '" + commandToRun + " " + commandArguments + "' as " + guest_user);
var pid = procMgr.startProgramInGuest(vCVM, auth, spec);
System.log("Started program with PID: " + pid);
*/
