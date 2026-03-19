/**
 * Get range info
 *
 * @param {Any} attrRange - [object Object]
 * @param {string} attrOnDemandTagName - [object Object]
 * @param {string} attrOnDemandTagValue - [object Object]
 * @return {boolean} attrOnDemandRange - [object Object]
 * @return {Properties} attrEaProperties
 */
attrOnDemandRange = false;
var info = "Range info...";
info += "\n\tReference: " + attrRange.reference;
info += "\n\tStart address: " + attrRange.startAddress;
info += "\n\tEnd address: " + attrRange.endAddress;
info += "\n\tNetwork: " + attrRange.networkAddress + "/" + attrRange.networkCidr;
info += "\n\tNetwork view: " + attrRange.networkView;
var attrEaProperties = new Properties();
if ((attrRange.extensibleAttributes != null) && (attrRange.extensibleAttributes != undefined) && (attrRange.extensibleAttributes.length > 0)) {
	info += "\n\tExtensible attributes: ";
	for (var i = 0, len = attrRange.extensibleAttributes.length; i < len; i++) {
		if ((attrRange.extensibleAttributes[i].name == attrOnDemandTagName) && (attrRange.extensibleAttributes[i].value == attrOnDemandTagValue)) {
			attrOnDemandRange = true;
		}
		info += "\n\t\tname = \"" + attrRange.extensibleAttributes[i].name + "\" value = \"" + attrRange.extensibleAttributes[i].value + "\"";
        attrEaProperties.put(attrRange.extensibleAttributes[i].name , attrRange.extensibleAttributes[i].value);
	}
}
if (attrRange.comment != null) {
	info += "\n\tComment: " + attrRange.comment;
}
System.log(info);
