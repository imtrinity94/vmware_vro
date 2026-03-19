/**
 * @description Retrieves the value of a named attribute from a vRO Configuration Element
 *              located at a specific category path.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * Copyright 2020, VMware, Inc. All Rights Reserved
 * VMware vRealize Orchestrator 7.x action sample
 *
 * @param {string} categoryPath - The path to the Configuration Element category.
 * @param {string} configName - The name of the Configuration Element.
 * @param {string} attributeName - The name of the attribute to retrieve.
 * @returns {*} attributeValue - The value of the specified attribute, or null if not found.
 */

var configCategory = Server.getConfigurationElementCategoryWithPath(categoryPath);

if (!configCategory) {
    throw "Configuration element category path '" + categoryPath + "' not found.";
}

var matchingElementsList = configCategory.configurationElements.filter(function(element) {
    return element.name == configName;
});

if (matchingElementsList && matchingElementsList.length === 1) {
    var attributesList = matchingElementsList[0].attributes;
    var i;
    for (i = 0; i < attributesList.length; i++) {
        var attrObj = attributesList[i];
        if (attrObj.name == attributeName) {
            System.debug("Retrieved attribute '" + attributeName + "' from " + configName);
            return attrObj.value;
        }
    }
} else {
    throw "Configuration element '" + configName + "' not found or not unique in path '" + categoryPath + "'.";
}

System.warn("Attribute '" + attributeName + "' not found in configuration element '" + configName + "'.");
return null;
