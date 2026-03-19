/**
 * @description Retrieves the value of a named attribute from a vRO Configuration Element
 *              located at a specific category path.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * Copyright 2020, VMware, Inc. All Rights Reserved
 * VMware vRealize Orchestrator 7.x action sample
 *
 * @param {string} categoryPath - The path to the Configuration Element category.
 * @param {string} cfgName - The name of the Configuration Element.
 * @param {string} attributeName - The name of the attribute to retrieve.
 * @returns {*} The value of the specified attribute, or null if not found.
 */

var category = Server.getConfigurationElementCategoryWithPath(categoryPath);

if (category == null) {
    throw("Configuration element path '" + categoryPath + "' not found!!");
}

var cfgElements = category.configurationElements.filter(function(element) {
    return element.name == cfgName;
});

// Get attribute names
if (cfgElements != null && cfgElements.length == 1) {
    for (attribute in cfgElements[0].attributes) {
        if (cfgElements[0].attributes[attribute].name == attributeName) {
            return cfgElements[0].attributes[attribute].value;
        }
    }
} else {
    throw("Configuration name '" + cfgName + "' not found or not unique!!");
}
return null;
