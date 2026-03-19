/**
 * Get VMware values
 *
 * @param {Properties} props
 * @return {VC:VmFolder} vmFolder
 * @return {string} vmName
 * @return {VC:VirtualMachine} vmSource
 * @return {boolean} vmPowerOn
 * @return {boolean} vmTemplate
 * @return {VC:Datastore} vmDatastore
 * @return {VC:HostSystem} vmHost
 * @return {VC:ResourcePool} vmPool
 */
vmFolder = 		props.get("vmFolder");
vmName = 		props.get("vmName");
vmSource = 		props.get("vmSource");

if (props.get("vmPowerOn") == null)
	vmPowerOn = true
else
	vmPowerOn = props.get("vmPowerOn");
System.debug("Powering On After clone: " + vmPowerOn);
	
if (props.get("vmTemplate") == null)
	vmTemplate = false;
else
	vmTemplate = 	props.get("vmTemplate");
	
vmDatastore = 	props.get("vmDatastore");
vmHost = 		props.get("vmHost");
vmPool = 		props.get("vmPool");
System.log(System.getObjectClassName(vmPool));
