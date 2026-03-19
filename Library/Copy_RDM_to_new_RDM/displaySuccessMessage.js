/**
 * displaySuccessMessage
 *
 * @param {VC:VirtualMachine} targetVM - [object Object]
 * @param {string} rdmVolumeName
 * @param {PS:Volume} rdmVolume
 * @return {PS:Volume} newRDMVolume
 */
newRDMVolume = rdmVolume;
System.log("Volume '" + rdmVolumeName + "' is created from snapshot and has been successfully added to VM " + targetVM.name);