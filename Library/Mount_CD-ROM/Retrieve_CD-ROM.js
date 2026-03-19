/**
 * Retrieve CD-ROM
 *
 * @param {VC:VirtualMachine} vm
 * @param {number} ideControllerKey
 * @return {Any} cdrom
 */
var devices = vm.config.hardware.device;
cdrom = null;
if ( devices != null )  {
	for ( ii in devices )  {
		if ( devices[ii] instanceof VcVirtualCdrom )  {
			if ( devices[ii].controllerKey == ideControllerKey )  {
				System.log( "Found CD-ROM" );
				cdrom = devices[ii];
				break;
			}
		}
	}
}
