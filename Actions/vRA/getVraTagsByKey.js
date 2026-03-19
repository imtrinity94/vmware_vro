/**
 * Retrieves vRA tags filtered by a specific key and returns them as a colon-separated array.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {string} vraHost The vRA host identifier.
 * @param {string} tagKey The key to filter tags by.
 * @returns {string[]} Array of "key:value" strings for the matching tags.
 */

var url = "/iaas/api/tags"; 
var parameters = encodeURI("$filter=key eq '" + tagKey + "'"); 

var tags = System.getModule("com.vmware.vra.extensibility.plugin.rest").getObjects(vraHost, url, parameters); 

var tagArray = new Array(); 
if (tags) {
    for each (var tag in tags) { 
        tagArray.push(tag.key + ":" + tag.value); 
    } 
}
  
return tagArray;
