/**
 * Get custom properties
 *
 * @param {CompositeType(Id:string,Name:string,Description:string,Type:string,TenantId:string,TenantName:string,Properties:Properties):Resource} Resource
 * @param {CompositeType(Id:string,Name:string,Description:string,Type:string,TenantName:string,Properties:Properties):ResourceNew} ResourceNew
 * @return {boolean} attrCreateHostRecord
 * @return {boolean} attrCreateAddressRecord
 * @return {boolean} attrCreateAddressAndPtrRecords
 * @return {boolean} attrCreateFixedAddress
 * @return {boolean} attrCreateReservation
 * @return {boolean} attrRestartIfNeeded
 */
attrCreateHostRecord = getBooleanValue("Infoblox.IPAM.createHostRecord");
attrCreateAddressRecord = getBooleanValue("Infoblox.IPAM.createAddressRecord");
attrCreateAddressAndPtrRecords = getBooleanValue("Infoblox.IPAM.createAddressAndPtrRecords");
attrCreateFixedAddress = getBooleanValue("Infoblox.IPAM.createFixedAddress");
attrCreateReservation = getBooleanValue("Infoblox.IPAM.createReservation");
attrRestartIfNeeded = getBooleanValue("Infoblox.IPAM.restartIfNeeded");

function getBooleanValue (key) {
    try{
        var value = ResourceNew.Properties[key];
    }
    catch(err){
        var value = "false";
    }

    switch (value){
        case "true":
				return true;
            case "false":
            case undefined:
				return false;
			default:
				throw "Error allocating IP address(es) because custom property \"" + key + "\" has invalid value \"" + value + "\", code: 1002";
    }
}
System.log(attrCreateHostRecord)