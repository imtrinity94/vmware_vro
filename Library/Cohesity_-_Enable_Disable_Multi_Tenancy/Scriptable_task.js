/**
 * Scriptable task
 *
 * @param {boolean} enableMT - [object Object]
 * @param {boolean} isolateBGResources - [object Object]
 */
var category = Server.getConfigurationElementCategoryWithPath('Cohesity');
if (!category) {
	var config_element = Server.createConfigurationElement('Cohesity', 'MTConfiguration');
} else {
	for (var i in category.configurationElements) {
		if (category.configurationElements[i].name == 'MTConfiguration') {
			var config_element = category.configurationElements[i];
		}
	}
	if (!config_element) {
		var config_element = Server.createConfigurationElement('Cohesity', 'MTConfiguration');
	}
}
config_element.setAttributeWithKey('enableMT', enableMT);
config_element.setAttributeWithKey('isolateBGResources', isolateBGResources);
config_element.setAttributeWithKey('updatedDate',new Date());

System.log("Updated MT configuration.");