/**
 * Update Flags
 *
 * @param {boolean} queueConcurrentRuns - [object Object]
 * @param {number} maxConcurrentRunChecks - [object Object]
 * @param {number} retryDelayForConcurrencyCheck - [object Object]
 * @param {string} hostPropertyOnSourceRegistration - [object Object]
 * @param {boolean} awaitRunCompletion - [object Object]
 * @param {boolean} allowMultiJobProtection - [object Object]
 */
var category = Server.getConfigurationElementCategoryWithPath('Cohesity');
if (!category) {
	var config_element = Server.createConfigurationElement('Cohesity', 'Settings');
} else {
	for (var i in category.configurationElements) {
		if (category.configurationElements[i].name == 'Settings') {
			var config_element = category.configurationElements[i];
		}
	}
	if (!config_element) {
		var config_element = Server.createConfigurationElement('Cohesity', 'Settings');
	}
}
config_element.setAttributeWithKey('queueConcurrentRuns', queueConcurrentRuns);
config_element.setAttributeWithKey('maxConcurrentRunChecks', maxConcurrentRunChecks);
config_element.setAttributeWithKey('retryDelayForConcurrencyCheck', retryDelayForConcurrencyCheck);
config_element.setAttributeWithKey('hostPropertyOnSourceRegistration', hostPropertyOnSourceRegistration);
config_element.setAttributeWithKey('awaitRunCompletion', awaitRunCompletion);
config_element.setAttributeWithKey('allowMultiJobProtection', allowMultiJobProtection);

System.log("Updated Cohesity Settings & flags.");