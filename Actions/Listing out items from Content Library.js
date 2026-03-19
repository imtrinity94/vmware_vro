/**
 * @description Lists all items across all Content Libraries accessible through all VAPI endpoints.
 *              Returns an array of Content Library item model objects.
 *
 * @note No inputs required.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @returns {VAPI:com_vmware_content_library_item__model[]} ovfLibraryItem - Array of library item models.
 */

// Set the VAPI endpoint to the first endpoint returned
var endpoints = VAPIManager.getAllEndpoints();
var endpoint = endpoints[0];

if (endpoint == null) {
    throw "Unable to locate a VAPI endpoint";
}
var ovfLibraryItem = new Array();

for each (var endpoint in endpoints) {
    System.log("Searching endpoint " + endpoint);
    var client = endpoint.client();
    var clib = new com_vmware_content_library(client);
    System.log("The number of libraries on this endpoint is: " + clib.list().length);
    System.log(clib.list());

    if (clib.list().length >= 1) {
        var itemSvc = new com_vmware_content_library_item(client);

        for each (var clibrary in clib.list()) {
            var items = itemSvc.list(clibrary);
            System.log(items);

            for each (item in items) {
                var results = itemSvc.get(item);
                System.log(results.name);
                ovfLibraryItem.push(results);
            }
        }
    }
    client.close();
}
