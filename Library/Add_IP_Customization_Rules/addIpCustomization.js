/**
 * addIpCustomization
 *
 * @param {SRM:Site} site
 * @param {string} secondaryWinsServer
 * @param {string} dnsSuffixes
 * @param {string} dnsAddresses
 * @param {number} subnetPrefix
 * @param {string} remoteSubnet
 * @param {string} localSubnet
 * @param {SRM:LocalNetwork} localNetwork
 * @param {string} primaryWinsServer
 * @param {string} gateway
 */
//Auto generated script, cannot be modified !
System.getModule("com.vmware.library.srm.mapping").addIpCustomization(site,localNetwork,localSubnet,remoteSubnet,subnetPrefix,gateway,dnsAddresses,dnsSuffixes,primaryWinsServer,secondaryWinsServer) ;