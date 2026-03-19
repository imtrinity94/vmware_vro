/**
 * Get network info
 *
 * @param {string} attrOnDemandTagName - [object Object]
 * @param {string} attrOnDemandTagValue - [object Object]
 * @param {Any} attrNetwork - [object Object]
 * @return {boolean} attrOnDemandNetwork - [object Object]
 * @return {string} attrNetworkRef - [object Object]
 */
var info = "Network info...";
attrNetworkRef = attrNetwork.reference;
info += "\n\tReference: " + attrNetworkRef;
info += "\n\tNetwork: " + attrNetwork.address + "/" + attrNetwork.cidr;
info += "\n\tNetwork view: " + attrNetwork.networkView;
if ((attrNetwork.extensibleAttributes != null) && (attrNetwork.extensibleAttributes != undefined) && (attrNetwork.extensibleAttributes.length > 0)) {
	info += "\n\tExtensible attributes: ";
	for (var i = 0, len = attrNetwork.extensibleAttributes.length; i < len; i++) {
		if ((attrNetwork.extensibleAttributes[i].name == attrOnDemandTagName) && (attrNetwork.extensibleAttributes[i].value == attrOnDemandTagValue)) {
			attrOnDemandNetwork = true;
		}
		info += "\n\t\tname = \"" + attrNetwork.extensibleAttributes[i].name + "\" value = \"" + attrNetwork.extensibleAttributes[i].value + "\"";
	}
}
if (attrNetwork.comment != null) {
	info += "\n\tComment: " + attrNetwork.comment;
}
System.log(info);
