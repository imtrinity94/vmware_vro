/**
 * Simple task with custom script capability.
 *
 * @param {number} ipamIndex
 * @param {Array/CompositeType(reference:string,name:string,comment:string,defaultNetworkView:string,extensibleAttributes:Array/InfobloxIPAM:IpamExtensibleAttributeDefinition):AddressSpaceType} AddressSpaceList
 * @return {string} attrAddressSpace
 */
attrAddressSpace = AddressSpaceList[ipamIndex].name;
System.log(attrAddressSpace)