/**
 * Get vNIC properties
 *
 * @param {CompositeType(Id:string,Name:string,Description:string,Type:string,TenantId:string,TenantName:string,Properties:Properties):Resource} Resource
 * @param {number} attrVnicIndex
 * @param {CompositeType(Id:string,Name:string,Description:string,Type:string,TenantName:string,Properties:Properties):ResourceNew} ResourceNew
 * @return {string} attrDnsView
 * @return {string} attrComment
 * @return {Array/string} attrAliases
 * @return {string} attrMsDhcpServer
 * @return {boolean} attrEnableDhcp
 * @return {boolean} attrEnableDns
 * @return {string} attrDNSSuffixOverride
 */
if (isNaN(attrVnicIndex)) {
	throw "Cannot retrieve Infoblox specific vNIC properties: invalid vNIC index.";
}

attrDnsView = ResourceNew.Properties[getKey("dnsView")]
attrComment = ResourceNew.Properties[getKey("comment")]
attrAliases = getStringArray(getKey("aliases"));
attrMsDhcpServer = ResourceNew.Properties[getKey("msDhcpServer")]
attrEnableDhcp = getBooleanValue(getKey("enableDhcp"));
attrEnableDns = getBooleanValue(getKey("enableDns"));

attrDNSSuffixOverride = ResourceNew.Properties[getKey("Domain")]
function getBooleanValue(key) {
	var value = ResourceNew.Properties[key];
	
    if (value) {
    	switch (value.toLowerCase()) {
        	case "true":
				return true;
            case "false":
				return false;
			default:
				throw "Error allocating IP address(es) because custom property \"" + key + "\" has invalid value \"" + value + "\", code: 1002";
        }
    }

    return false;
}

function getStringArray(key) {
	var value = ResourceNew.Properties[key];
	
	if (!value) {
		return null;
	}
	
	var result = [];
	var items = value.split(',');
	for each (var item in items) {
		item = item.trim();
		if (item) {
			result.push(item);
		}
	}

	return result;
}

function getKey(name) {
	return "Infoblox.IPAM.Network" + attrVnicIndex + "." + name;
}
