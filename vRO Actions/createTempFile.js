// VMware vRealize Orchestrator action sample
//
// Create a temporary text-based file, in a temporary directory, on the vRO server
// Sample usage would be to later copy the file to a guest vCenter VM
// 
// For vRO 6.0+
//
// Action Inputs:
// vroTempFileName - string - Name of the file to create
// fileContents - string - Contents of the file
//
// Return type: string - Full path of the file on the vRO server

var tempDir = System.getTempDirectory();
vroTempFileFullPath = tempDir + "/" + vroTempFileName;

var writer;
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
