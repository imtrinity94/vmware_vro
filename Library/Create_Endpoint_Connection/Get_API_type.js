/**
 * Get API type
 *
 * @param {CompositeType(Id:string,URL:string,Username:string,Password:SecureString,Properties:Properties):Endpoint} Endpoint
 * @param {string} attrEndpointUrl
 * @return {InfobloxIPAM:IpamApiType} attrApiType
 */
var apiTypeName = getApiType();

if (apiTypeName == null) {
	System.log("Custom property \"Infoblox.IPAM.APIType\" not defined. Using default API type: WAPI");
	attrApiType = IpamApiType.WAPI;
} else if (apiTypeName == "WAPI") {
	attrApiType = IpamApiType.WAPI;
} else if (apiTypeName == "Cloud API") {
	attrApiType = IpamApiType.CLOUD_API;
} else {
	throw "Error connecting to Infoblox IPAM endpoint [" + attrEndpointUrl + "] because custom property \"Infoblox.IPAM.APIType\" has invalid value \"" + apiTypeName + "\", code: 3001";
}

function getApiType() {
	if (Endpoint.Properties != null &&
		Endpoint.Properties != undefined &&
		Endpoint.Properties.keys != null &&
		Endpoint.Properties.keys != undefined &&
		Endpoint.Properties.keys.length > 0) {
		return Endpoint.Properties.get("Infoblox.IPAM.APIType");
	}
	
	return null;
}
