/**
 * Get default address space
 *
 * @param {InfobloxIPAM:IpamConnection} attrIpamConnection
 * @return {string} attrAddressSpace
 */
var viewManager = attrIpamConnection.getViewManager();
attrAddressSpace = viewManager.getDefaultNetworkView();
System.log("Set default address space: " + attrAddressSpace);