/**
 * Converts the input to a VCO object.
i.e if RemotePSObject that represents VM is passed as argument the Action will return Array/Any with size 1 and VC:VirtualMachine at index 0.
 *
 * @param {ResourceElement} converterDefinitionsCSV - [object Object]
 * @param {Any} obj - [object Object]
 * @return {Array/Any} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.powershell.converter").convertToVcoObj(converterDefinitionsCSV,obj) ;