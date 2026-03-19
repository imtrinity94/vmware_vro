/**
 * Get payload properties from vRA
 *
 * @param {Properties} payload
 * @return {string} endpointName
 * @return {string} pJobName
 * @return {VC:VirtualMachine} vcVM
 * @return {string} vmwareSource
 */
System.debug("Payload " + payload);

for (var key in payload){
  System.log( key +" = "+ payload[key] );
  System.debug( key +" = "+ payload[key] );
}

if (payload == null) { throw "Required workflow input not provided: payload"; }
var machine = payload.get("machine") ;
var vmname = machine.get("name");

System.debug("machine " + machine);
System.log("vmname: " + vmname);

var vCACVmProperties = machine.get("properties") ;
System.debug("vCACVmProperties " + vCACVmProperties);

var uuid = vCACVmProperties.get("VirtualMachine.Admin.UUID");
System.debug("UUID " + uuid);

vcVM = System.getModule("com.vmware.vcac.asd").findVcVmByUuid(uuid) ;
if(vcVM == null)
{
	var msg = "The VM is unable to locate its vCenter in vRO. Verify if vRA reserved vCenter is properly configured with vRO"; 
	throw msg;
}

endpointName = vCACVmProperties.get("com.cohesity.endpointName");
System.log("endpointName: " + endpointName);

pJobName = vCACVmProperties.get("com.cohesity.protectionJobName");
System.log("pJobName " + pJobName);

var nameInput = vCACVmProperties.get("com.cohesity.vmwareSource");
var names = nameInput.split("[");
if (names.length > 1) {
	vmwareSource = names[0].trim();
} else {
	System.warn("No vmware source name provided.");
	vmwareSource = "";
}
System.log("vmwareSource " + vmwareSource);