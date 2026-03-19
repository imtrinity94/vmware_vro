/**
 * Get Cohesity VM object from vCenter
 *
 * @param {CS:CohesityConnection} connection - [object Object]
 * @param {VC:VirtualMachine} vm - [object Object]
 * @param {CS:RootNode} sourceNode
 * @return {CS:VirtualMachine} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.cohesity.plugin.protectionSources").getCohesityVMObject(connection,vm,sourceNode) ;