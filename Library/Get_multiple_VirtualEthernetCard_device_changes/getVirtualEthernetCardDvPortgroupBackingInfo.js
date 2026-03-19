/**
 * The virtual Ethernet card backing class. (uses Distributed Virtual Portgroup as input instead of VC:Network object)
 *
 * @param {string} deviceName - [object Object]
 * @param {Any} network - [object Object]
 * @return {Any} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.vc.networking").getVirtualEthernetCardDvPortgroupBackingInfo(deviceName,network) ;