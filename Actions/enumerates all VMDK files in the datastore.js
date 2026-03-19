/**
 * Enumerates all VMDK files within a specific Datastore.
 * Performs a recursive search using the Datastore Browser.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {VC:Datastore} datastore The datastore to search.
 * @returns {string[]} An array of full paths to all VMDK files found.
 */

var result = new Array();
var querySpec = new VcHostDatastoreBrowserSearchSpec();
querySpec.query = null;
querySpec.matchPattern = ["*.vmdk"];

var task = datastore.browser.searchDatastoreSubFolders_Task("[" + datastore.name + "]", querySpec);
var searchResults = System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(task, false, 5);

if (searchResults != null) {
    for (var i in searchResults) {
        if (searchResults[i].file != null) {
            for (var j in searchResults[i].file) {
                result.push(searchResults[i].folderPath + searchResults[i].file[j].path);
            }
        }
    }
}

System.log("Found " + result.length + " VMDK files.");
return result;
