/**
 * Check if CD-ROM already exists
 *
 * @param {VC:VirtualMachine} vm
 * @param {number} ideControllerKey
 * @return {boolean} cdromFound
 */
var devices = vm.config.hardware.device;
cdromFound = false;
if ( devices != null )  {
	for ( ii in devices )  {
		if ( devices[ii] instanceof VcVirtualCdrom )  {
			if ( devices[ii].controllerKey == ideControllerKey )  {
				System.log( "Found CD-ROM" );
				cdromFound = true;
				break;
			}
		}
	}
}
