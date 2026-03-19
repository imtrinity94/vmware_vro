/**
 * Retrieve IDE Bus 0
 *
 * @param {VC:VirtualMachine} vm
 * @return {number} ideControllerKey
 * @return {Any} cdrom
 */
ideControllerKey = -1;
cdrom = null;
var devices = vm.config.hardware.device;
if ( devices != null )  {
	for ( ii in devices )  {
		if ( devices[ii] instanceof VcVirtualIDEController )  {
			if ( devices[ii].busNumber == 0 )  {
				ideControllerKey = devices[ii].key;
				System.log( "Found IDE controller (Key: " + ideControllerKey + ") for busNumber " + devices[ii].busNumber );
				break;
			}
		}
	}
}
