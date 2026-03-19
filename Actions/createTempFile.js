/**
 * Creates a temporary text-based file in a temporary directory on the vRO server.
 * Useful for staging files before copying them to guest VMs or other systems.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {string} vroTempFileName Name of the file to create.
 * @param {string} fileContents Contents of the file.
 * @returns {string} Full path of the file on the vRO server.
 */

var tempDir = System.getTempDirectory();
var vroTempFileFullPath = tempDir + "/" + vroTempFileName;

var writer = null;
try {
    writer = new FileWriter(vroTempFileFullPath);
} catch (e) {
    throw "Failed to create temp file in vRO server: " + vroTempFileFullPath + " :: " + e;
}

try {
    writer.open();
} catch (e) {
    throw "Failed to open temp file for editing in vRO server: " + vroTempFileFullPath + " :: " + e;
}

try {
    writer.write(fileContents);
} catch (e) {
    throw "Failed to write contents to temp file in vRO server: " + vroTempFileFullPath + " :: " + e;
}

try {
    writer.close();
    System.debug("Contents written to vRO temp file " + vroTempFileFullPath + " successfully.");
} catch (e) {
    throw "Failed to close temp file after editing in vRO server: " + vroTempFileFullPath + " :: " + e;
}

return vroTempFileFullPath;
