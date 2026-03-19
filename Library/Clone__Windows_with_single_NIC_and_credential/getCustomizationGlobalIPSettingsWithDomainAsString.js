/**
 * A collection of global IP settings for a virtual network adapter. In Linux, DNS server settings are global. The settings can either be statically set or supplied by a DHCP server.
 *
 * @param {Array/string} dnsServerList - [object Object]
 * @param {string} dnsDomain - [object Object]
 * @return {Any} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.vc.vm.spec").getCustomizationGlobalIPSettingsWithDomainAsString(dnsServerList,dnsDomain) ;