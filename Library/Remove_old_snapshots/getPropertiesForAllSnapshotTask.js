/**
 * Return properties with the name of snapshot as key and vc object VirtualMachineSnapshot as value. It is used to get the snapshot VC Object when searching information on the snapshot from the datastorebrowser which return the name of the snapshot but not the object.
 *
 * @return {Properties} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.vc.vm.snapshot").getPropertiesForAllSnapshotTask() ;