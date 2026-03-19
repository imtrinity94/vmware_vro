/**
 * @description Creates a temporary text-based file in a temporary directory on the vRO server.
 *              Useful for staging files before copying them to guest VMs or other systems.
 * @note JSDoc generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {string} vroTempFileName Name of the file to create.
 * @param {string} fileContents Contents of the file.
 * @returns {string} tempFileFullPath - Full path of the file on the vRO server.
 */

var tempDirectory = System.getTempDirectory();
var tempFileFullPath = tempDirectory + "/" + vroTempFileName;

var fileWriter = null;
try {
    fileWriter = new FileWriter(tempFileFullPath);
    fileWriter.open();
    fileWriter.write(fileContents);
    fileWriter.close();
    System.debug("Contents written to vRO temp file: " + tempFileFullPath);
} catch (e) {
    System.error("Error managing temp file " + tempFileFullPath + ": " + e);
    throw "Failed to manage temp file: " + e;
}

return tempFileFullPath;
