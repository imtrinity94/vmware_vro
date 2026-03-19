/**
 * Updates or creates a resource element in vRO with the provided CSV content.
 * 
 * @author Mayank Goyal
 * @version 1.0.0
 * 
 * @throws {string} If the resource path cannot be parsed or if any error occurs during execution.
 */

// Define the resource path
var resourcePath = "CloudBlogger/vRA/vRA_Machine_details.csv";
var csvContent = "Name,IP Address,Status\n";

try {
    // Attempt to retrieve the resource element by its full path
    resource = System.getModule("com.vmware.pso.util").getResourceElementByFullPath(resourcePath);
} catch (e) {
    // Log a warning if the resource element cannot be retrieved
    System.warn(e);
}

// If the resource element does not exist, create a new one
if (!resource) {
    var categoryPath, resourceName;
    var delimiterIndex = resourcePath.lastIndexOf("/");

    // Validate the resource path format
    if (delimiterIndex === -1) {
        throw "Failed to parse resource element path for creating a new resource element";
    }

    // Extract the category path and resource name from the resource path
    categoryPath = resourcePath.substr(0, delimiterIndex);
    resourceName = resourcePath.substr(delimiterIndex + 1);

    // Create a new resource element with the specified category path and name
    resource = Server.createResourceElement(categoryPath, resourceName, null, "text/csv");
}

// Create a MimeAttachment object to hold the CSV content
resourceMime = new MimeAttachment();
resourceMime.name = resource.name;
resourceMime.mimeType = "text/csv";
resourceMime.content = csvContent; 

// Update the resource element with the new content
resource.setContentFromMimeAttachment(resourceMime);

// Log a success message
System.log("Resource element at \"" + resourcePath + "\" updated successfully.");