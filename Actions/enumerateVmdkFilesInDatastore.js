/**
 * Enumerates all VMDK files within a specific Datastore.
 * Performs a recursive search using the Datastore Browser.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {VC:Datastore} vcDatastore The datastore to search.
 * @returns {string[]} vmdkPathsArray - An array of full paths to all VMDK files found.
 */

var vmdkPathsArray = [];
var browserSearchSpec = new VcHostDatastoreBrowserSearchSpec();
browserSearchSpec.query = null;
browserSearchSpec.matchPattern = ["*.vmdk"];

var datastoreBrowserTask = vcDatastore.browser.searchDatastoreSubFolders_Task("[" + vcDatastore.name + "]", browserSearchSpec);
var searchResultNodes = System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(datastoreBrowserTask, false, 5);

if (searchResultNodes != null) {
    var i;
    for (i = 0; i < searchResultNodes.length; i++) {
        var resultNode = searchResultNodes[i];
        if (resultNode.file != null) {
            var filesList = resultNode.file;
            var j;
            for (j = 0; j < filesList.length; j++) {
                vmdkPathsArray.push(resultNode.folderPath + filesList[j].path);
            }
        }
    }
}

System.log("Found " + vmdkPathsArray.length + " VMDK files in datastore '" + vcDatastore.name + "'.");
return vmdkPathsArray;
