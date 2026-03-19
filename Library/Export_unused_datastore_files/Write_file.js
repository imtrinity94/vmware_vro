/**
 * Write file
 *
 * @param {Properties} diskFiles
 * @param {Properties} vmFiles
 * @param {string} path
 * @return {MimeAttachment} mimeFile
 */
if (path == null || path ==""){
	path = System.getTempDirectory(); 
}
var filename = path + workflow.id + ".csv";

var file = new FileWriter(filename);
file.open();
file.clean();
file.lineEndType = 1;
file.writeLine("VM Config Files");
var keys = vmFiles.keys;
for each (var key in keys) {
	file.writeLine(key);
}

file.writeLine("VM Disk Files");
var keys = diskFiles.keys;
for each (var key in keys) {
	file.writeLine(key);
}

file.close();

mimeFile = new MimeAttachment(filename);
mimeFile.name = "VM files.csv";