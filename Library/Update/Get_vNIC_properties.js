/**
 * Get vNIC properties
 *
 * @param {Properties} vCACVmProperties
 * @param {number} vnicIndex
 * @return {string} attrIpAddress
 * @return {string} attrExternalAddress
 * @return {string} attrMacAddress
 * @return {boolean} attrEnableDhcp
 */
attrIpAddress = vCACVmProperties.get(getVraNetworkKey("Address"));
attrExternalAddress = vCACVmProperties.get(getVraNetworkKey("ExternalAddress"));
attrMacAddress = vCACVmProperties.get(getVraNetworkKey("MacAddress"));
attrEnableDhcp = getBooleanValue(getInfobloxNetworkKey("enableDhcp"));

function getVraNetworkKey(name) {
	return "VirtualMachine.Network" + vnicIndex + "." + name;
}

function getInfobloxNetworkKey(name) {
	return "Infoblox.IPAM.Network" + vnicIndex + "." + name;
}

function getBooleanValue(key) {
	var value = vCACVmProperties.get(key);
    if (value) {
    	switch (value.toLowerCase()) {
        	case "true":
				return true;
            case "false":
				return false;
			default:
				throw "Error updating MAC address(es) because custom property  \"" + key + "\" has invalid value \"" + value + "\", code: 1010";
        }
    }
    return false;
}
