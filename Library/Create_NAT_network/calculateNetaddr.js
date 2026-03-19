/**
 * Gets the network address from given gateway address and network mask. 
E.g. for given gateway 10.0.0.1 and mask 255.255.255.0, the network address 10.0.0.0 will be received.
 *
 * @param {string} gatewayIP - [object Object]
 * @param {string} netMask - [object Object]
 * @return {string} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.infoblox.ipam.util").calculateNetaddr(gatewayIP,netMask) ;