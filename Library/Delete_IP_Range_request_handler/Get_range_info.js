/**
 * Get range info
 *
 * @param {Any} attrDhcpRange - [object Object]
 * @param {string} attrOnDemandTagName - [object Object]
 * @param {string} attrOnDemandTagValue - [object Object]
 * @return {string} attrNetworkAddress - [object Object]
 * @return {number} attrNetworkCidr - [object Object]
 * @return {boolean} attrOnDemandRange - [object Object]
 */
var info = "Range info...";
attrNetworkAddress = attrDhcpRange.networkAddress;
attrNetworkCidr = attrDhcpRange.networkCidr;
info += "\n\tReference: " + attrDhcpRange.reference;
info += "\n\tNetwork: " + attrNetworkAddress + "/" + attrNetworkCidr;
info += "\n\tNetwork view: " + attrDhcpRange.networkView;
if ((attrDhcpRange.extensibleAttributes != null) && (attrDhcpRange.extensibleAttributes != undefined) && (attrDhcpRange.extensibleAttributes.length > 0)) {
	info += "\n\tExtensible attributes: ";
	for (var i = 0, len = attrDhcpRange.extensibleAttributes.length; i < len; i++) {
		if ((attrDhcpRange.extensibleAttributes[i].name == attrOnDemandTagName) && (attrDhcpRange.extensibleAttributes[i].value == attrOnDemandTagValue)) {
			attrOnDemandRange = true;
		}
		info += "\n\t\tname = \"" + attrDhcpRange.extensibleAttributes[i].name + "\" value = \"" + attrDhcpRange.extensibleAttributes[i].value + "\"";
	}
}
if (attrDhcpRange.comment != null) {
	info += "\n\tComment: " + attrDhcpRange.comment;
}
System.log(info);
