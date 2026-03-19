/**
 * Retrieve Scsi controller found ?
 *
 * @param {VC:VirtualMachine} vm
 * @param {number} scsiBusNumber
 * @return {number} scsiControllerKey
 */
scsiControllerKey = -1;
var devices = vm.config.hardware.device;
var isScsiBusNumberInvalid = true;
if(scsiBusNumber==null || scsiBusNumber<0)
	scsiBusNumber=0;
if ( devices != null )  {
	for ( device in devices )  {
		if ( devices[device] instanceof VcVirtualBusLogicController || devices[device] instanceof VcVirtualLsiLogicController 
		|| devices[device] instanceof VcParaVirtualSCSIController || devices[device] instanceof VcVirtualLsiLogicSASController )  {
			if(scsiBusNumber==devices[device].busNumber){
				scsiControllerKey = devices[device].key;
				isScsiBusNumberInvalid = false;
				System.log( "SCSI controller found. (Key: " + scsiControllerKey + ")" );
				break;
			}
		}
	}
}
if(isScsiBusNumberInvalid){
	System.log( "SCSI controller not found. The bus number entered is invalid" );
}

