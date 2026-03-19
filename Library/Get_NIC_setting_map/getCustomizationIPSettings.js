/**
 * Define IP settings for a virtual network adapter.
 *
 * @param {string} dnsDomain - [object Object]
 * @param {Array/string} dnsServerList - [object Object]
 * @param {Array/string} gateway - [object Object]
 * @param {Any} ip - [object Object]
 * @param {VC:CustomizationNetBIOSMode} netBIOS - [object Object]
 * @param {string} primaryWINS - [object Object]
 * @param {string} secondaryWINS - [object Object]
 * @param {string} subnetMask - [object Object]
 * @return {Any} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.vc.vm.spec.nic").getCustomizationIPSettings(dnsDomain,dnsServerList,gateway,ip,netBIOS,primaryWINS,secondaryWINS,subnetMask) ;