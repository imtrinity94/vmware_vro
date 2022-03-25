//input datastore of type datastore
var result = new Array();

var querySpec = new VcHostDatastoreBrowserSearchSpec();

querySpec.query = null;

querySpec.matchPattern = ["*.vmdk"];

var task = datastore.browser.searchDatastoreSubFolders_Task("[" + datastore.name + "]", querySpec);

var searchResults = System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(task,false,5);

if (searchResults != null) {

  for (var i in searchResults) {

    if (searchResults[i].file != null) {

      for (var j in searchResults[i].file) {

        result.push(searchResults[i].folderPath + searchResults[i].file[j].path);

      }

    }

  }

}

System.log(result);
