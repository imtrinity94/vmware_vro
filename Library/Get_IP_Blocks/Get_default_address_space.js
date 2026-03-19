/**
 * Get default address space
 *
 * @param {InfobloxIPAM:IpamConnection} attrIpamConnection
 * @return {string} attrAddressSpace
 */
var viewManager = attrIpamConnection.getViewManager();
attrAddressSpace = viewManager.getDefaultNetworkView();

var allAddressSpaces = viewManager.getAllNetworkViews();
var addressSpacesList = new Array();
for(var i = 0; i < allAddressSpaces.length; i++){
    addressSpacesList.push({
        Name: allAddressSpaces[i].name,
        Comment: allAddressSpaces[i].comment
    });
}
System.log(attrAddressSpace)
System.log("----------------------")
System.log(JSON.stringify(addressSpacesList));
System.log("Set default address space: " + attrAddressSpace);