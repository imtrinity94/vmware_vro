/**
 * Get All Unknown vmdk and vmtx files
 *
 * @param {Array/string} emailContent
 * @param {boolean} labManagerPresent
 * @param {string} labManagerSystemName
 * @return {Array/string} emailContent
 * @return {Array/string} unknownFiles
 */
// Get all VMs known to vCO
var allVms = VcPlugin.getAllVirtualMachines(new Array());
var allVmFiles = new Array();
for (var i in allVms) {
	allVmFiles = allVmFiles.concat(allVms[i].layoutEx.file);
}
// Get all Datastores known to vCO
var allDatastores = VcPlugin.getAllDatastores();

var fileList = new Array();

for (var i in allDatastores) {
	ds = allDatastores[i];
	System.log( "Checking datastore: " + ds.name + " for unknown vmdk files");
	Server.log( "Checking datastore: " + ds.name + " for unknown vmdk files");
	try {
		// Get all vmdk files for a datastore
		files = System.getModule("com.vmware.library.vc.datastore.files").getAllVmdkFile(ds);
		var fileFound = false;
		for (var x in files) {
			//ignore esx console
			var filename = System.getModule("com.vmware.basic").getFileName(files[x]);
			if (filename == "esxconsole.vmdk") {
				continue;
			}
			var vmFound = false;
			for (var y in allVmFiles) {
				if (files[x] == allVmFiles[y].name) {
					vmFound = true;
					break;
				}
			}
			if (vmFound == false) {
				if (isLabManagerFould(files[x]) == false) {
					fileFound = true;
					emailContent.push("The file " + files[x] + " is not associated with any vm known to vCO.");
					fileList.push(files[x]);
					System.log("The file " + files[x] + " is not associated with any vm known to vCO."  );
					Server.log("The file " + files[x] + " is not associated with any vm known to vCO."  );
				}
			}
		}
		if (fileFound == false) {
			System.log("No File found on datastore " + ds.name);
			Server.log("No File found on datastore " + ds.name);
		}
	}
	catch (e) {
		System.error("Exception while browsing datastore " +  ds.name + " exception " + e);
	}
}
unknownFiles = fileList;


function isLabManagerFould(file) {
	if (labManagerPresent == false) return false;
	if (labManagerSystemName == null || labManagerSystemName == "") return false;
	file = file.substring(file.indexOf("] ") + 2);
	return (file.indexOf(labManagerSystemName+ "/" ) == 0);		
}