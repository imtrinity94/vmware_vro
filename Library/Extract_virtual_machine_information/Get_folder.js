/**
 * Get folder
 *
 * @param {VC:VirtualMachine} vm
 * @return {string} folderName
 * @return {string} folderId
 * @return {VC:VmFolder} folder
 */
folder = vm.parent;
folderName = folder.name;
folderId = folder.sdkId;