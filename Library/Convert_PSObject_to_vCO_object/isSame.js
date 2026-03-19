/**
 * Checks if two objects can be considered SAME i.e. if PowerShellRemotePSObject is the same as VC:<Object> (for example VC:VirtualMachine)
 *
 * @param {Any} objectX
 * @param {Any} objectY
 * @param {ResourceElement} converterDefinitionsCSV
 * @return {boolean} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.powershell.converter").isSame(converterDefinitionsCSV,objectX,objectY) ;