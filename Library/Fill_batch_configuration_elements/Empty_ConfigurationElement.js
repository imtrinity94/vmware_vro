/**
 * Empty ConfigurationElement
 *
 * @param {ConfigurationElement} configurationElement
 * @param {ConfigurationElement} configurationElementAction
 */
var attributes = configurationElement.attributes;
for (i in attributes) {
	configurationElement.setAttributeWithKey(attributes[i].name,new Array());
}

var attributesAction = configurationElementAction.attributes;
for (i in attributesAction) {
	configurationElementAction.setAttributeWithKey(attributesAction[i].name,new Array());
}