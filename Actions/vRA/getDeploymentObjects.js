/**
 * Retrieves all deployment objects from a paginated vRA REST API endpoint.
 * Concatenates results from multiple pages into a single array.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {string} vraHost The vRA host object or name.
 * @param {string} url The REST endpoint URL.
 * @param {string} [parameters] Optional query parameters.
 * @returns {any[]|null} Concatenated array of deployment objects, or null if inputs are missing.
 */

if (vraHost == null || url == null) {
    return null; 
}

var restModule = "com.vmware.vra.extensibility.plugin.rest";
var object = System.getModule(restModule).getObjectFromUrl(vraHost, url, parameters); 

if (!object || !object.content) {
    return [];
}

var allContent = object.content; 
var page = 1; 

while (object.last === false) { 
    page++;
    var newParameters = (parameters == null || parameters == "") ? "page=" + page : parameters + "&page=" + page; 
    
    object = System.getModule(restModule).getObjectFromUrl(vraHost, url, newParameters); 
    if (object && object.content) {
        allContent = allContent.concat(object.content); 
    } else {
        break; // Stop if page retrieval fails
    }
} 

return allContent;
