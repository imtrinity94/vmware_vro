/**
 * Get custom properties
 *
 * @param {CompositeType(Id:string,Name:string,Description:string,Type:string,TenantName:string,Properties:Properties):ResourceNew} ResourceNew
 * @param {Array/CompositeType(Id:string,AddressSpaceId:string,IPRangeIds:Array/string,Description:string,NicIndex:string,IPAddresses:Array/string):ReleaseRequestNew} ReleaseRequestNew
 * @return {boolean} attrCreateHostRecord
 * @return {boolean} attrCreateAddressRecord
 * @return {boolean} attrCreateAddressAndPtrRecords
 * @return {boolean} attrCreateFixedAddress
 * @return {boolean} attrCreateReservation
 * @return {string} networkview
 */
attrCreateHostRecord = getBooleanValue("Infoblox.IPAM.createHostRecord");
attrCreateAddressRecord = getBooleanValue("Infoblox.IPAM.createAddressRecord");
attrCreateAddressAndPtrRecords = getBooleanValue("Infoblox.IPAM.createAddressAndPtrRecords");
attrCreateFixedAddress = getBooleanValue("Infoblox.IPAM.createFixedAddress");
attrCreateReservation = getBooleanValue("Infoblox.IPAM.createReservation");
networkview = ReleaseRequestNew[0].AddressSpaceId;
System.log(networkview)
function getBooleanValue(key) {
	var value = ResourceNew.Properties[key];
    if (value) {
    	switch (value.toLowerCase()) {
        	case "true":
				return true;
            case "false":
				return false;
			default:
				throw "Error releasing IP address(es) because custom property \"" + key + "\" has invalid value \"" + value + "\", code: 1008";
        }
    }
    return false;
}
