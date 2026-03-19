/**
 * Checks if the Data collection operation has completed and that the hard disk labels have been updated.
 *
 * @param {VC:VirtualMachine} vcVM - [object Object]
 * @param {vCAC:VCACHost} iaasHost - [object Object]
 */
//Auto generated script, cannot be modified !
System.getModule("com.cohesity.plugin.dev.utils").awaitDataCollectionCompletion(vcVM,iaasHost) ;