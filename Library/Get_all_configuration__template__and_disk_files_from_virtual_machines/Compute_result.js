/**
 * Compute result
 *
 * @param {Properties} vmdkFiles
 * @param {Properties} vmxFiles
 * @param {Array/string} vmdks
 * @param {Array/string} vmtxs
 * @param {Array/string} vmxs
 * @return {Properties} vmdkFiles
 * @return {Properties} vmxFiles
 */
if (vmdkFiles == null) vmdkFiles = new Properties();
if (vmxFiles == null) vmxFiles = new Properties();

for (var i in vmdks) {
	//ignore esx console
	var index = vmdks[i].lastIndexOf( "/" );
	var fname = vmdks[i].substring( index+1, vmdks[i].length );
	if (fname != "esxconsole.vmdk") {
		vmdkFiles.put(vmdks[i], vmdks[i]);
	}
}

for (var i in vmtxs) {
	vmxFiles.put(vmtxs[i], vmtxs[i]);
}

for (var i in vmxs) {
	vmxFiles.put(vmxs[i], vmxs[i]);
}