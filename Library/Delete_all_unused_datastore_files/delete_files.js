/**
 * delete files
 *
 * @param {Properties} diskFiles
 * @param {Properties} vmFiles
 * @return {Array/string} deletedFiles
 */
var files = new Array();

for (var i in diskFiles.keys) {
	files.push(diskFiles.keys[i]);
}

for (var i in vmFiles.keys) {
	files.push(vmFiles.keys[i]);
}

var datastores = System.getModule("com.vmware.library.vc.datastore").getAllDatastores();

for (var i in files) {
	var a = /\[(.+)] (.+)/(files[i]);
	var dsName = a[1];
	var fPath = a[2];
	for (var j in datastores) {
		if (datastores[j].name == dsName) {
			System.getModule("com.vmware.library.vc.datastore.files").deleteFile(datastores[j],fPath)
		}
	}
}

deletedFiles = files;