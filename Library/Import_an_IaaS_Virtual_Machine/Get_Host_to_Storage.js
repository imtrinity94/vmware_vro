/**
 * Get Host to Storage
 *
 * @param {vCAC:VCACHost} host - [object Object]
 * @param {vCAC:VirtualMachine} vm - [object Object]
 * @param {vCAC:Reservation} hostReservation - [object Object]
 * @return {vCAC:Entity} hostReservationToStorage - [object Object]
 * @return {string} storagePath - [object Object]
 */
storagePath = vm.storagePath;
hostReservationToStorage = System.getModule("com.vmware.library.vcac").getHostReservationToStorageFromStoragePath(host, hostReservation, storagePath);
if (hostReservationToStorage == null) throw "Cannot find host to storage reservation. Is the storage of the VM part of the reservation?";
links = new Properties();
var links = new Properties();
links.put("HostReservationToStorage", [hostReservationToStorage]);
var vmEntity = vm.getEntity();
System.getModule("com.vmware.library.vcac").updateEntity(vmEntity,new Properties(),links);