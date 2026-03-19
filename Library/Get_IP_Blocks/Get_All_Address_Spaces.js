/**
 * Simple task with custom script capability.
 *
 * @param {InfobloxIPAM:IpamConnection} attrIpamConnection
 * @param {Array/CompositeType(reference:string,name:string,comment:string,defaultNetworkView:string,extensibleAttributes:Array/InfobloxIPAM:IpamExtensibleAttributeDefinition):AddressSpaceType} AddressSpaceList
 * @return {Array/CompositeType(reference:string,name:string,comment:string,defaultNetworkView:string,extensibleAttributes:Array/InfobloxIPAM:IpamExtensibleAttributeDefinition):AddressSpaceType} AddressSpaceList
 */
var viewManager = attrIpamConnection.getViewManager();

System.log("This is the address space list from the view manager");

System.log(viewManager.getAllNetworkViews());

if(AddressSpaceList == null || AddressSpaceList == undefined){
    AddressSpaceList = new Array();
}

// AddressSpaceList = new Array();

var allAddressSpaces = viewManager.getAllNetworkViews();
System.log(allAddressSpaces[0])

for(var i=0; i < allAddressSpaces.length; i++){
    AddressSpaceList.push({
        reference: allAddressSpaces[i].reference,
        name: allAddressSpaces[i].name,
        comment: allAddressSpaces[i].comment,
        defaultNetworkView: allAddressSpaces[i].defaultNetworkView,
        extensibleAttributes: allAddressSpaces[i].extensibleAttributes
    });

}

System.log(AddressSpaceList);