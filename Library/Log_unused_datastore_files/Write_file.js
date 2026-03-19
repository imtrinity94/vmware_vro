/**
 * Write file
 *
 * @param {Properties} diskFiles
 * @param {Properties} vmFiles
 * @param {Path} filename
 */
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