/**
 * Remove snapshots
 *
 * @param {Array/VC:VirtualMachineSnapshot} snapshots
 * @param {string} content
 * @param {boolean} sendEmail
 * @param {Array/VC:VirtualMachine} vmWithLotSnapshots
 * @param {number} numberOfSnapshotLeft
 * @param {VC:VirtualMachine} activeVM
 * @return {string} content
 */
var vm = activeVM;	
var snapshotsInVm = System.getModule("com.vmware.library.vc.vm.snapshot").getAllSnapshotsOfVM(vm);
var snapshotLength = snapshotsInVm.length;
var numberOfSnapshotToDelete = snapshotLength-numberOfSnapshotLeft;
System.getModule("com.vmware.library.vc.vm.snapshot").removeOldestSnapshotOfVM(vm,numberOfSnapshotToDelete) ;
content = content + "<br>The " + numberOfSnapshotToDelete + " oldest snapshots of the VM " + vm.name + " have been removed";
System.log("The " + numberOfSnapshotToDelete + " oldest snapshots of the VM " + vm.name + " have been removed");



