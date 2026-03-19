/**
 * Start register workflow
 *
 * @param {vCAC:Reservation} hostReservation
 * @param {vCAC:Entity} hostReservationToStorage
 * @param {string} owner - [object Object]
 * @param {vCAC:VirtualMachine} vm - [object Object]
 * @param {string} storagePath - [object Object]
 * @param {string} identityUser - [object Object]
 * @param {vCAC:Entity} systemBlueprint
 * @param {vCACCAFE:CompositeBlueprint} blueprint - [object Object]
 * @param {string} blueprintComponent - [object Object]
 * @param {string} deploymentName - [object Object]
 * @return {string} templateId
 * @return {string} virtualMachineId
 * @return {string} hostReservationId
 * @return {string} hostStorageReservationId
 */
if (!vm) throw "Virtual machine should not be null.";
if (!hostReservation) throw "Host reservation should not be null.";
if (!hostReservationToStorage) throw "Host reservation to storage should not be null. Is the VM storage " + storagePath + " part of the reservation " + hostReservation.displayName;

templateId = systemBlueprint.getProperty("VirtualMachineTemplateID");
virtualMachineId = vm.virtualMachineID;
hostReservationId = hostReservation.hostReservationID;
hostStorageReservationId = hostReservationToStorage.getProperty("HostReservationToStorageID");

System.log("templateId: " + templateId);
System.log("virtualMachineId: " + virtualMachineId);
System.log("hostReservationId: " + hostReservationId);
System.log("hostStorageReservationId: " + hostStorageReservationId);

var arguments = {
	user:owner,
	identityUser:identityUser,
	templateId:templateId,
	hostReservationId:hostReservationId,
	hostStorageReservationId:hostStorageReservationId,
	blueprintComponentId:blueprintComponent,
	blueprintId:blueprint.id,
	deploymentName:deploymentName
};

vm.registerVm(arguments, null);