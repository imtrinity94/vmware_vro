/**
 * @description Searches for all files in a specific datastore on a named ESXi host using the
 *              vCenter Datastore Browser. Returns file paths collected into a Properties object.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {string} strESXiHostName - The name of the ESXi host to search on.
 * @param {string} strDataStoreName - The name of the datastore to browse.
 * @param {*} objCustomActions - Module reference providing the waitVIM3Task helper.
 * @returns {Properties} objProperties - A Properties object mapping file paths to empty strings.
 */

var objProperties = new Properties();

var arrVcSdkConnection = VcPlugin.allSdkConnections;

var objVcVmDiskFileQuery = new VcVmDiskFileQuery();
var objVcVmSnapshotFileQuery = new VcVmSnapshotFileQuery();
var objVcVmLogFileQuery = new VcVmLogFileQuery();
var objVcVmConfigFileQuery = new VcVmConfigFileQuery();
var objVcIsoImageFileQuery = new VcIsoImageFileQuery();

var arrFileQuery = new Array();
arrFileQuery.push(objVcVmDiskFileQuery);
arrFileQuery.push(objVcVmSnapshotFileQuery);
arrFileQuery.push(objVcVmLogFileQuery);
arrFileQuery.push(objVcVmConfigFileQuery);
arrFileQuery.push(objVcIsoImageFileQuery);

var objVcHostDatastoreBrowserSearchSpec = new VcHostDatastoreBrowserSearchSpec();
objVcHostDatastoreBrowserSearchSpec.query = arrFileQuery;

for each (var objVcSdkConnection in arrVcSdkConnection) {
    var arrVCHostSystem = objVcSdkConnection.getAllHostSystems();

    for each (var objVCHostSystem in arrVCHostSystem) {
        if (objVCHostSystem.name == strESXiHostName) {
            var arrVcDataStore = objVCHostSystem.datastore;

            for each (var objVcDataStore in arrVcDataStore) {
                if (objVcDataStore.info.name == strDataStoreName) {
                    System.log("===== Data Store: " + objVcDataStore.info.name);

                    var objVcHostDatastoreBrowser = objVcDataStore.browser;

                    var objVcTask = objVcHostDatastoreBrowser.searchDatastoreSubFolders_Task("[" + objVcDataStore.name + "]", objVcHostDatastoreBrowserSearchSpec);

                    var arrVcHostDatastoreBrowserSearchResults = objCustomActions.waitVIM3Task(objVcTask);

                    for each (var objVcHostDatastoreBrowserSearchResults in arrVcHostDatastoreBrowserSearchResults) {
                        System.log("===== Folder Path: " + objVcHostDatastoreBrowserSearchResults.folderPath);

                        var arrVcFileInfo = objVcHostDatastoreBrowserSearchResults.file;

                        for each (var objVcFileInfo in arrVcFileInfo) {
                            objProperties.put(objVcHostDatastoreBrowserSearchResults.folderPath + objVcFileInfo.path, "");
                        }
                    }

                    break;
                }
            }
        }
    }
}
