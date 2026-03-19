/**
 * Display Success Message
 *
 * @param {VC:VirtualMachine} VM
 * @param {PS:Volume} volToDelete
 * @return {PS:Volume} rdmVolume
 */
rdmVolume = volToDelete;
System.log("Volume " + volToDelete.name + "removed from VM " + VM.name + " and disconnected from its host.");