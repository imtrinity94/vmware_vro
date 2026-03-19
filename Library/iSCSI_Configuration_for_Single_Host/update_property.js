/**
 * update property
 *
 * @param {VC:HostSystem} esxiHost
 * @param {string} iSCSIDeviceName
 */
var hostStorageSystem = VcPlugin.toManagedObject( esxiHost, esxiHost.configManager.storageSystem );

System.log("Rescanning iSCSI software adapter after adding iSCSI targets...");
hostStorageSystem.rescanHba(iSCSIDeviceName);

//getting all bus Adapter
var hostBusAdapters = hostStorageSystem.storageDeviceInfo.hostBusAdapter;

var advanceOptions=new Array();
var myVcHostInternetScsiHbaTargetSet = new VcHostInternetScsiHbaTargetSet() ;


var myVcHostInternetScsiHbaParamValue = new VcHostInternetScsiHbaParamValue() ;
myVcHostInternetScsiHbaParamValue.isInherited=false;
myVcHostInternetScsiHbaParamValue.key="LoginTimeout";
myVcHostInternetScsiHbaParamValue.value_IntValue=30;
advanceOptions.push(myVcHostInternetScsiHbaParamValue);

var myVcHostInternetScsiHbaParamValue1 = new VcHostInternetScsiHbaParamValue() ;
myVcHostInternetScsiHbaParamValue.isInherited=false;
myVcHostInternetScsiHbaParamValue1.key="DelayedAck";
myVcHostInternetScsiHbaParamValue1.value=false;
advanceOptions.push(myVcHostInternetScsiHbaParamValue1);
//getting all static target of Software bus adapter
for each(var busAdapter in hostBusAdapters){
	if(busAdapter.driver=='iscsi_vmk' && busAdapter instanceof VcHostInternetScsiHba)
	{
		var iScsiHbaDevice=busAdapter.device;
		var targets=busAdapter.configuredStaticTarget;
		System.log("Adapter device found : "+iScsiHbaDevice);
		System.log("Static target found: "+targets.length);
		break;
	}
}

for each(target in targets){
	System.log(target.address);
}

myVcHostInternetScsiHbaTargetSet.staticTargets=targets;
hostStorageSystem.updateInternetScsiAdvancedOptions(iScsiHbaDevice,myVcHostInternetScsiHbaTargetSet,advanceOptions);

System.log("Rescanning iSCSI software adapter after changing the properties...");
hostStorageSystem.rescanHba(iSCSIDeviceName);
System.log("Rescan complete!!!");
