/**
 * Generates a configuration file on the vRO server and transfers it to a guest Windows VM.
 * Also includes a snippet for starting a program in the guest VM.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {VC:VirtualMachine} vcVirtualMachine The target virtual machine.
 * @param {string} tempFileName Name of the VM (used for temp file naming).
 * @param {string} destinationFilePath The destination file path on the guest VM.
 * @param {Properties} configProperties A properties object containing key-value pairs for the config file.
 * @param {string} guestAdminUser Local admin username for the guest VM.
 * @param {SecureString} guestAdminPassword Local admin password for the guest VM.
 * @returns {void}
 */

// Setup VM Guest Operations
var guestOpsManager = vcVirtualMachine.sdkConnection.guestOperationsManager;
var guestFileManager = guestOpsManager.fileManager;

// Create temp file on vRO server
var localTempFile = System.createTempFile(tempFileName);
var fileBuffer = "";
var lineEnding = "\n";

System.log("Transferring config file to Guest VM: " + vcVirtualMachine.name + " at " + destinationFilePath);

// Populate file content from properties
var propertyKeys = configProperties.keys;
var i;
for (i = 0; i < propertyKeys.length; i++) {
    var keyStr = propertyKeys[i];
    var valStr = configProperties.get(keyStr);
    if (typeof valStr === "string") {
        System.debug("Mapping Property: " + keyStr + "=" + valStr);
        fileBuffer += keyStr + "=" + valStr + lineEnding;
    }
}

// Write buffer to local temp file
localTempFile.write(fileBuffer);

// Guest file parameter setup
var fileSizeVal = localTempFile.length;
var overwriteFile = true;
var windowsFileAttr = new VcGuestWindowsFileAttributes();

// Guest Authentication Setup
var guestAuth = new VcNamePasswordAuthentication();
guestAuth.username = guestAdminUser;
guestAuth.password = guestAdminPassword;
guestAuth.interactiveSession = false;

// Execute Guest File Transfer
try {
    var uploadUrl = guestFileManager.initiateFileTransferToGuest(vcVirtualMachine, guestAuth, destinationFilePath, windowsFileAttr, fileSizeVal, overwriteFile);
    System.debug("Guest transfer URL initiated: " + uploadUrl);
    
    var transferResult = guestFileManager.putFile(localTempFile.path, uploadUrl);
    System.log("File transfer completed for " + destinationFilePath + ". Result: " + transferResult);
} catch (error) {
    System.error("Critical error during file transfer to guest VM: " + error);
} finally {
    // Delete local temp file
    if (localTempFile.exists) {
        localTempFile.deleteFile();
    }
}

return null;
