/**
 * @description Returns the content of a Resource Element after performing placeholder
 *              substitution. Placeholders in the format {{variableName}} are replaced with
 *              values from the provided Properties object.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {string} resourcePath - The path to the Resource Element category.
 * @param {string} resourceName - The name of the Resource Element.
 * @param {Properties} properties - Key/value store where keys match placeholder names and
 *                                  values are the strings to substitute.
 * @returns {string} The Resource Element content with all placeholders replaced.
 */

var content = undefined;

// Fetch resource element
var category = Server.getResourceElementCategoryWithPath(resourcePath);
for each (var resourceElement in category.resourceElements) {
    if (resourceElement.name == resourceName) {
        content = resourceElement.getContentAsMimeAttachment().content;
        break;
    }
}
if (!content) throw "No resoucre element found for path: " + resourcePath + ", and name: " + resourceName;

// Gather variables e.g. {{foo}}
var pattern = new RegExp(/\{\{[a-zA-Z]*\}\}/g);
var matches = content.match(pattern);

// Replace variables
for each (var match in matches) {
    var key = match.substring(2, match.length - 2);
    System.debug("replacing match: " + match + ", with value: " + properties[key]);
    content = content.replace(match, properties[key]);
}

System.debug("new refined content: \n" + content);
return content;
