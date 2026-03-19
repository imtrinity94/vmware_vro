/**
 * Create folder
 *
 * @param {VC:VmFolder} parentFolder
 * @param {string} name
 * @return {VC:VmFolder} newFolder
 */
newFolder = parentFolder.createFolder(name);

// This tests are done by the workflow validation

//if (parentFolder == null) 
//	throw "ReferenceError: Parent folder is null";
//else if (name == null || name == "")
//	throw "ReferenceError: New name folder is null";
//else
