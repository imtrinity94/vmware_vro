/**
 * Scriptable task
 *
 * @param {string} endpointName
 * @param {string} newCspUri
 * @param {string} newCloudApiUri
 * @param {SecureString} newRefreshToken
 */
if (endpointName && newRefreshToken && newCloudApiUri && newCspUri) {
    var found = CloudEndpointManager.getEndpoint(endpointName);
    if (found) {
        System.log("Attempt to update cloud endpoint " + endpointName + ".");
        System.getModule("com.vmware.library.cloudservices.configuration").updateEndpoint(endpointName,endpointName,newCspUri,newCloudApiUri,newRefreshToken) ;        
    } else {
        System.log("Attempt to create a cloud endpoint " + endpointName + ".");
        System.getModule("com.vmware.library.cloudservices.configuration").addEndpoint(endpointName,newCspUri,newCloudApiUri,newRefreshToken) ;        
    }
}