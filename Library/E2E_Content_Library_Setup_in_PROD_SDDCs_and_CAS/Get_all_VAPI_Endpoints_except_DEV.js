/**
 * Simple task with custom script capability.
 *
 * @param {string} devVapiEndpointName
 * @return {Array/VAPI:VAPIEndpoint} allVapiEndpointsInventory
 */
Server.log("\""+System.currentWorkflowItem().getDisplayName()+"\"  script started");

var allVapiEndpointsInventory = VAPIManager.getAllEndpoints();

for (var i in allVapiEndpointsInventory){
    if(allVapiEndpointsInventory[i].name == devVapiEndpointName){
        allVapiEndpointsInventory.splice(i, 1); //remove the DEV endpoint from array
    }
}

if(allVapiEndpointsInventory.length > 0){
    System.log("*** List of all VAPI Endpoints to run synchronization");
    allVapiEndpointsInventory.forEach(function(endpoint, index){
        System.log(index +": "+ endpoint.name);
    });
}
Server.log("\""+System.currentWorkflowItem().getDisplayName()+"\"  script completed");