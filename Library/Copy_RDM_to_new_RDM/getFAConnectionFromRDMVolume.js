/**
 * getFAConnectionFromRDMVolume
 *
 * @param {VC:VirtualMachine} sourceVM
 * @param {PS:Volume} rdmVolume
 * @return {PS:FlashArrayConnection} flashArrayConnection
 */
var flashArrayConnection=PSVolumeManager.getFAConnectionForVolume(rdmVolume);
System.debug("FlashArray connection returned: "+flashArrayConnection);
System.log("FlashArray connection returned successfully!!");
//Get the VC:HostSystem from VC:VirtualMachine
sourceVCHostSystem = VcPlugin.convertToVimManagedObject(sourceVM, sourceVM.runtime.host);
//Auto generated script, cannot be modified !
sourcePSHostSystem = System.getModule("com.purestorage.flasharray.vmware.vcenter").correlateESXiToHost(sourceVCHostSystem,flashArrayConnection) ;

if(!sourcePSHostSystem){
System.error("host object required.");
}

