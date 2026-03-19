/**
 * Get Payload properties from vRA
 *
 * @param {Properties} payload
 * @return {VC:VirtualMachine} vcVM
 * @return {string} endpointName
 */
System.debug("Payload " + payload);
if (payload == null) { throw "Required workflow input not provided: payload"; }
var machine = payload.get("machine") ;
var vmname = machine.get("name"); 


System.debug("machine " + machine);
System.log("vmname " + vmname);


var vCACVmProperties = machine.get("properties") ;
System.debug("vCACVmProperties " + vCACVmProperties);

var uuid = vCACVmProperties.get("VirtualMachine.Admin.UUID");
System.debug("UUID " + uuid);

vcVM = System.getModule("com.vmware.vcac.asd").findVcVmByUuid(uuid) ;

endpointName = vCACVmProperties.get("com.cohesity.endpointName");
System.log("endpointName " + endpointName);



