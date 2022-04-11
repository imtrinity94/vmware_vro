var objProperties;
	objProperties = new Properties();

var arrVcSdkConnection;
	arrVcSdkConnection = VcPlugin.allSdkConnections;

var objVcVmDiskFileQuery;
	objVcVmDiskFileQuery = new VcVmDiskFileQuery();

var objVcVmSnapshotFileQuery;
	objVcVmSnapshotFileQuery = new VcVmSnapshotFileQuery();

var objVcVmLogFileQuery;
	objVcVmLogFileQuery = new VcVmLogFileQuery();

var objVcVmConfigFileQuery;
	objVcVmConfigFileQuery = new VcVmConfigFileQuery();

var objVcIsoImageFileQuery;
	objVcIsoImageFileQuery = new VcIsoImageFileQuery();

var arrFileQuery;
	arrFileQuery = new Array();
	arrFileQuery.push(objVcVmDiskFileQuery);
	arrFileQuery.push(objVcVmSnapshotFileQuery);
	arrFileQuery.push(objVcVmLogFileQuery);
	arrFileQuery.push(objVcVmConfigFileQuery);
	arrFileQuery.push(objVcIsoImageFileQuery);

var objVcHostDatastoreBrowserSearchSpec;
	objVcHostDatastoreBrowserSearchSpec = new VcHostDatastoreBrowserSearchSpec();
	objVcHostDatastoreBrowserSearchSpec.query = arrFileQuery;		

for each (var objVcSdkConnection in arrVcSdkConnection)
{
	var arrVCHostSystem;
		arrVCHostSystem = objVcSdkConnection.getAllHostSystems()

	for each (var objVCHostSystem in arrVCHostSystem)
	{
		if ( objVCHostSystem.name == strESXiHostName )
		{
			var arrVcDataStore;
				arrVcDataStore = objVCHostSystem.datastore;

			for each (var objVcDataStore in arrVcDataStore)
			{
				if ( objVcDataStore.info.name == strDataStoreName )
				{
					System.log("===== Data Store: " + objVcDataStore.info.name);

					var objVcHostDatastoreBrowser;
						objVcHostDatastoreBrowser = objVcDataStore.browser;

					var objVcTask;
						objVcTask = objVcHostDatastoreBrowser.searchDatastoreSubFolders_Task("[" + objVcDataStore.name + "]", objVcHostDatastoreBrowserSearchSpec);

					var arrVcHostDatastoreBrowserSearchResults;
						arrVcHostDatastoreBrowserSearchResults = objCustomActions.waitVIM3Task(objVcTask);

					for each (var objVcHostDatastoreBrowserSearchResults in arrVcHostDatastoreBrowserSearchResults)
					{
						System.log("===== Folder Path: " + objVcHostDatastoreBrowserSearchResults.folderPath);

						var arrVcFileInfo;
							arrVcFileInfo = objVcHostDatastoreBrowserSearchResults.file;

						for each (var objVcFileInfo in arrVcFileInfo)
						{
							objProperties.put(objVcHostDatastoreBrowserSearchResults.folderPath + objVcFileInfo.path, "");
						}
					}

					break;
				}
			}
		}
	}
}
