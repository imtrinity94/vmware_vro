/**
 * Retrieves a resource element in vRO by its full path.
 * 
 * @author Mayank Goyal
 * @version 1.0.0
 * 
 * @param {string} fullPath - The full path of the resource element (e.g., "Category/Subcategory/ResourceName").
 * @returns {ResourceElement|null} The resource element if found, or null if not found.
 * 
 * @throws {void} Logs warnings or errors if the resource element cannot be found.
 */

if (!fullPath) {
    System.warn("Full path of resource element is missing");
    return null;
}

var resourceElementPath;
var resourceElementName = fullPath;

// Extract the category path and resource name from the full path
var delimiterIndex = resourceElementName.lastIndexOf("/");
if (delimiterIndex !== -1) {
    resourceElementPath = resourceElementName.substr(0, delimiterIndex);
    resourceElementName = resourceElementName.substr(delimiterIndex + 1);
} else {
    System.error("Resource element cannot be found from format: " + fullPath);
    return null;
}

// Retrieve the resource element category
var category = Server.getResourceElementCategoryWithPath(resourceElementPath);
if (!category) {
    System.warn("Resource element category not found: " + resourceElementPath);
    return null;
}

// Search for the resource element within the category
var resourceElements = category.resourceElements;
for (var i in resourceElements) {
    var resource = resourceElements[i];
    if (resource.name === resourceElementName) {
        return resource;
    }
}

// Log a warning if the resource element is not found
System.warn("Resource element not found: " + fullPath);

return null;