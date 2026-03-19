/**
 * Retrieves vRA tags filtered by a specific key and returns them as an array of "key:value" strings.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {string} vraHostId - The vRA host identifier.
 * @param {string} searchTagKey - The key to filter tags by.
 * @returns {string[]} tagResultArray - Array of "key:value" strings for matching tags.
 */

var iaasTagsUrl = "/iaas/api/tags"; 
var queryFilterParams = encodeURI("$filter=key eq '" + searchTagKey + "'"); 

// Use the standard IaaS API helper module for REST object retrieval
var fetchedTagsList = System.getModule("com.vmware.vra.extensibility.plugin.rest").getObjects(vraHostId, iaasTagsUrl, queryFilterParams); 

var tagResultArray = []; 
if (fetchedTagsList && fetchedTagsList.length > 0) {
    System.debug("Processing " + fetchedTagsList.length + " tags for key: " + searchTagKey);
    
    var i;
    for (i = 0; i < fetchedTagsList.length; i++) {
        var currentTagObj = fetchedTagsList[i];
        tagResultArray.push(currentTagObj.key + ":" + currentTagObj.value); 
    } 
} else {
    System.log("No tags discovered for key: '" + searchTagKey + "'");
}
  
return tagResultArray;
