/**
 * Get network view info
 *
 * @param {string} attrOnDemandTagName - [object Object]
 * @param {string} attrOnDemandTagValue - [object Object]
 * @param {Any} attrNetworkViewObject - [object Object]
 * @return {boolean} attrOnDemandNetworkView - [object Object]
 * @return {string} attrNetworkViewRef - [object Object]
 */
var info = "Network view info...";
attrNetworkViewRef = attrNetworkViewObject.reference;
info += "\n\tReference: " + attrNetworkViewRef;
info += "\n\tName: " + attrNetworkViewObject.name;
info += "\n\tIs default: " + attrNetworkViewObject.defaultNetworkView;

if ((attrNetworkViewObject.extensibleAttributes != null) && (attrNetworkViewObject.extensibleAttributes != undefined) && (attrNetworkViewObject.extensibleAttributes.length > 0)) {
	info += "\n\tExtensible attributes: ";
	for (var i = 0, len = attrNetworkViewObject.extensibleAttributes.length; i < len; i++) {
		if ((attrNetworkViewObject.extensibleAttributes[i].name == attrOnDemandTagName) && (attrNetworkViewObject.extensibleAttributes[i].value == attrOnDemandTagValue)) {
			attrOnDemandNetworkView = true;
		}
		info += "\n\t\tname = \"" + attrNetworkViewObject.extensibleAttributes[i].name + "\" value = \"" + attrNetworkViewObject.extensibleAttributes[i].value + "\"";
	}
}
if (attrNetworkViewObject.comment != null) {
	info += "\n\tComment: " + attrNetworkViewObject.comment;
}
System.log(info);
