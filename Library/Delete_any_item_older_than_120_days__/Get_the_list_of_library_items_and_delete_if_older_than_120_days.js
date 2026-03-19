/**
 * Simple task with custom script capability.
 *
 * @param {VAPI:VAPIEndpoint} vapiClient
 * @param {string} contentLibraryId
 * @param {string} contentLibraryName
 */
Server.log("\""+System.currentWorkflowItem().getDisplayName()+"\"  script started");

try {
    var myVapiClient = vapiClient.client();  
    var myContentLibrary = new com_vmware_content_library(myVapiClient);  // root library object
    var contentLibraryList = myContentLibrary.list(); //all content libraries
    for (var i in contentLibraryList) {
        if(contentLibraryList[i] == contentLibraryId){ //match with desired library id
            System.log("Content Library "+contentLibraryName+" found in "+vapiClient.name);
            var itemsService = new com_vmware_content_library_item(myVapiClient); //item service obj
            var libraryItems = itemsService.list(contentLibraryList[i]);  // all library items obj
            for(var j in libraryItems) {
                var myLibraryItem = itemsService.get(libraryItems[j]); 
                if(myLibraryItem){
                    System.log("Item name: "+ myLibraryItem.name);
                    System.log("Item last modified: "+ myLibraryItem.last_modified_time);
                    var noOfDayslastmodified = System.getModule("com.mayank.actions").findNumberOfDays(myLibraryItem.last_modified_time);
                    if(noOfDayslastmodified > 120){
                        System.log("As item's last modification date is older than 120 days, hence deleting it...");
                        itemsService.delete(item); 
                    }
                } else throw "No items found in Content Library ("+contentLibraryId+")";
            }
        }
    }
    myVapiClient.close();
} catch (e){
    throw ("Found exception! Cannot Proceed. REASON: "+e);
}

Server.log("\""+System.currentWorkflowItem().getDisplayName()+"\"  script completed");