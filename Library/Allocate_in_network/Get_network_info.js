/**
 * Get network info
 *
 * @param {Any} attrNetwork - [object Object]
 * @param {string} attrOnDemandTagName - [object Object]
 * @param {string} attrOnDemandTagValue - [object Object]
 * @return {boolean} attrOnDemandNetwork - [object Object]
 * @return {Properties} attrEaProperties
 */
attrOnDemandNetwork = false;
var info = "Network info...";
info += "\n\tReference: " + attrNetwork.reference;
info += "\n\tNetwork: " + attrNetwork.address + "/" + attrNetwork.cidr;
info += "\n\tNetwork view: " + attrNetwork.networkView;
var attrEaProperties = new Properties();
if ((attrNetwork.extensibleAttributes != null) && (attrNetwork.extensibleAttributes != undefined) && (attrNetwork.extensibleAttributes.length > 0)) {
	info += "\n\tExtensible attributes: ";
	for (var i = 0, len = attrNetwork.extensibleAttributes.length; i < len; i++) {
		if ((attrNetwork.extensibleAttributes[i].name == attrOnDemandTagName) && (attrNetwork.extensibleAttributes[i].value == attrOnDemandTagValue)) {
			attrOnDemandNetwork = true;
		}
		info += "\n\t\tname = \"" + attrNetwork.extensibleAttributes[i].name + "\" value = \"" + attrNetwork.extensibleAttributes[i].value + "\"";
		attrEaProperties.put(attrNetwork.extensibleAttributes[i].name , attrNetwork.extensibleAttributes[i].value);

	}
}
if (attrNetwork.comment != null) {
	info += "\n\tComment: " + attrNetwork.comment;
}
System.log(info);
