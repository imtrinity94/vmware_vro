/**
 * @description Returns the content of a Resource Element after performing placeholder
 *              substitution. Placeholders in the format {{variableName}} are replaced with
 *              values from the provided Properties object.
 * @note JSDoc generated via Antigravity AI IDE and can be reasonably incorrect.
 *
 * @param {string} resourceCategoryPath - The path to the Resource Element category.
 * @param {string} resourceElementName - The name of the Resource Element.
 * @param {Properties} substitutionProperties - Key/value store where keys match placeholder names and
 *                                              values are the strings to substitute.
 * @returns {string} refinedContent - The Resource Element content with all placeholders replaced.
 */

var refinedContent = null;

// Navigate to the target resource category
var resourceCategoryObj = Server.getResourceElementCategoryWithPath(resourceCategoryPath);
if (!resourceCategoryObj) {
    throw "Resource Category not found: " + resourceCategoryPath;
}

var allResourceElements = resourceCategoryObj.resourceElements;
var i;
for (i = 0; i < allResourceElements.length; i++) {
    var elementObj = allResourceElements[i];
    if (elementObj.name === resourceElementName) {
        System.debug("Matched Resource Element: " + elementObj.name);
        refinedContent = elementObj.getContentAsMimeAttachment().content;
        break;
    }
}

if (!refinedContent) {
    throw "Resource element '" + resourceElementName + "' was not found in path '" + resourceCategoryPath + "'.";
}

// Identify variables matching pattern {{varName}}
var placeholderRegexPattern = new RegExp(/\{\{[a-zA-Z]*\}\}/g);
var matchedPlaceholdersList = refinedContent.match(placeholderRegexPattern);

// Perform substitutions
if (matchedPlaceholdersList) {
    System.log("Discovered " + matchedPlaceholdersList.length + " placeholders for substitution.");
    var j;
    for (j = 0; j < matchedPlaceholdersList.length; j++) {
        var fullPlaceholder = matchedPlaceholdersList[j];
        var variableKey = fullPlaceholder.substring(2, fullPlaceholder.length - 2);
        var replacementValue = substitutionProperties.get(variableKey);
        
        System.debug("Replacement Task -> Substitute: " + fullPlaceholder + " with: " + replacementValue);
        
        // Ensure replacement value is at least an empty string to avoid accidental 'undefined' injection
        var finalValue = (replacementValue !== null && replacementValue !== undefined) ? replacementValue : "";
        refinedContent = refinedContent.replace(fullPlaceholder, finalValue);
    }
}

System.debug("Substitution complete. Final content length: " + refinedContent.length);

return refinedContent;
