/**
 * @description Searches for all files in a specific datastore on a named ESXi host using the
 *              vCenter Datastore Browser. Returns file paths collected into a Properties object.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {string} esxiHostName - The name of the ESXi host to search on.
 * @param {string} datastoreName - The name of the datastore to browse.
 * @param {*} actionModule - Module reference providing the waitVIM3Task helper.
 * @returns {Properties} discoveredFilesMap - A Properties object mapping file paths to empty strings.
 */

var discoveredFilesMap = new Properties();
var sdkConnectionsList = VcPlugin.allSdkConnections;

// Define file queries for common vSphere file types
var diskQuery = new VcVmDiskFileQuery();
var snapshotQuery = new VcVmSnapshotFileQuery();
var logQuery = new VcVmLogFileQuery();
var configQuery = new VcVmConfigFileQuery();
var isoQuery = new VcIsoImageFileQuery();

var queriesArray = [diskQuery, snapshotQuery, logQuery, configQuery, isoQuery];

var browserSearchSpec = new VcHostDatastoreBrowserSearchSpec();
browserSearchSpec.query = queriesArray;

var i;
for (i = 0; i < sdkConnectionsList.length; i++) {
    var sdkConnection = sdkConnectionsList[i];
    var hostsSystemsArray = sdkConnection.getAllHostSystems();

    var j;
    for (j = 0; j < hostsSystemsArray.length; j++) {
        var hostSystemObj = hostsSystemsArray[j];

        if (hostSystemObj.name == esxiHostName) {
            var datastoresList = hostSystemObj.datastore;

            var k;
            for (k = 0; k < datastoresList.length; k++) {
                var datastoreObj = datastoresList[k];

                if (datastoreObj.info.name == datastoreName) {
                    System.log("Starting browse operation on datastore: " + datastoreObj.info.name);

                    var datastoreBrowser = datastoreObj.browser;
                    var searchTask = datastoreBrowser.searchDatastoreSubFolders_Task("[" + datastoreObj.name + "]", browserSearchSpec);
                    var searchResultNodes = actionModule.waitVIM3Task(searchTask);

                    if (searchResultNodes) {
                        var l;
                        for (l = 0; l < searchResultNodes.length; l++) {
                            var resultNode = searchResultNodes[l];
                            var folderFilesList = resultNode.file;
                            
                            if (folderFilesList) {
                                var m;
                                for (m = 0; m < folderFilesList.length; m++) {
                                    var fileInfo = folderFilesList[m];
                                    var fullPath = resultNode.folderPath + fileInfo.path;
                                    discoveredFilesMap.put(fullPath, "");
                                }
                            }
                        }
                    }
                    break;
                }
            }
        }
    }
}

System.log("Browse operation complete. Discovered " + discoveredFilesMap.keys.length + " files.");

return discoveredFilesMap;
