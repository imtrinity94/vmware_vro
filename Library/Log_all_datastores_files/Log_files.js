/**
 * Log files
 *
 * @param {Properties} diskFiles
 * @param {Properties} vmFiles
 */
System.log("VM config Files found");
var keys = vmFiles.keys;
for each (var key in keys) {
	System.log(key);
}

System.log("VM disk Files found");
var keys = diskFiles.keys;
for each (var key in keys) {
	System.log(key);
}