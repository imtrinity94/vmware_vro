/**
 * Store configuration for available VUM servers
 *
 * @param {Array/string} Vcenters
 * @param {string} defaultVcenter
 * @param {Array/string} vCenterWithVumToBeRemoved
 * @param {Array/string} alreadyConfiguredVumVcenter
 * @param {Array/string} newVcentersWithVum
 * @param {Array/string} alreadyConfiguredAndNotRemovedVcentersWithVum
 * @param {Array/WorkflowToken} worfklowTokens - [object Object]
 * @param {string} vumVcenterTable
 */
var  STATE_COMPLETED = 'completed';

// vCenter which has available Update Manager server and the SSL certificate importing is completed successfully
// that will be the set of vCenter servers with Update Manager  instance extension which will be registered as new configurations
var vCentersWithProperConfiguredVUM = [];

var availableVumServersWithImportedSSLCertificates = [];

// Sift the Update manager servers which are online and has successfully imported certificates
for  (var k in worfklowTokens)  {
    var workflowToken = worfklowTokens[k];
    var inputPrams = workflowToken.getInputParameters();
    // get Update Manager server url form the input parameters 
    var currentVumServerUrl = inputPrams['url'];

    if (STATE_COMPLETED === workflowToken.state)  {
       availableVumServersWithImportedSSLCertificates.push(currentVumServerUrl); 
    } else {
        Server.error("Update manager server with URL " + currentVumServerUrl + "  which is associated with vCenter server with URL "
          + vumVcenterTable[currentVumServerUrl] + " will be excluded from further processing because SSL certificate importing workflow finished with following state: " + workflowToken.state + " \n The workflow exception message is: " + workflowToken.exception);
    }
}

// find the URLs of the related vCenter servers for the Update Manager servers with successfully added SSL certificates
for (var k in availableVumServersWithImportedSSLCertificates) {
    var vumUrl = availableVumServersWithImportedSSLCertificates[k];
    if (vumVcenterTable[vumUrl]) {
        vCentersWithProperConfiguredVUM.push(vumVcenterTable[vumUrl]) ;
    }
}

// get the set of newly added and already existing (and not removed) vCenter servers
// this set is needed to check if the default server is an item in that set
var newlyAddedAndAlreadyConfiguredVcenters = vCentersWithProperConfiguredVUM.concat(alreadyConfiguredAndNotRemovedVcentersWithVum);

// check if there are more than one available vCenter server configurations
// if all vCenter servers are removed the default vCenter server does not matter
if (newlyAddedAndAlreadyConfiguredVcenters.length > 0) {
   // check if default vCenter server has assigned Update manager  server with successfully imported SSL certificate or it is among already stored configurations
   if (!isDefaultVcenterAvailable(defaultVcenter, newlyAddedAndAlreadyConfiguredVcenters)) {
      throw new Error("The selected default vCenter server with URL " + defaultVcenter + " is not available. The server might not have assigned Update Manager server, the Update manager server might not be available or there are problems with importing of SSL certificates. \n" 
        + "Please review the log to find out the reason why the server is selected vCenter server is not eligible for default vCenter server.");
   }
}

//process vCenter servers for removing
if (vCenterWithVumToBeRemoved.length > 0) {
    VumObjectManager.removeVcenterInstancesWithVum(vCenterWithVumToBeRemoved);
}

// process the vCenter servers to be registered - the newly added vCenter with Update manager, which has passed the
// Update Manager server extension check, Update Manager  server availability check and SSL certificates importing,
// register the new properly configured vCenter server with Update manager extensions
if (vCentersWithProperConfiguredVUM.length > 0) {
    VumObjectManager.registerVcenterInctencesWithVum(vCentersWithProperConfiguredVUM);
}

System.log("Added vCenter servers URLs:");
for (var i in vCentersWithProperConfiguredVUM) {
    System.log(vCentersWithProperConfiguredVUM[i]);
}

// set default server if there is available vCenter servers 
if (newlyAddedAndAlreadyConfiguredVcenters.length > 0) {
    VumObjectManager.changeDefaultServerTo(defaultVcenter);
    System.log("The default vCenter server is set to: " + defaultVcenter);
}

if (vCentersWithProperConfiguredVUM.length == 0 && newVcentersWithVum && newVcentersWithVum.length > 0) {
    System.warn("No vCenter servers are added during the execution of this workflow but the user input access that " + newVcentersWithVum.length 
    + " vCenter server shall be registered. It is possible to have problems with the selected vCenter servers - missing Update manager server assigned to vCenter server, SSL certificate issue, connectivity problem or another. Please review the workflow logs.");
}

/** Helper utils  **/
function isDefaultVcenterAvailable(defaultVCenter, vCenterServersArray) {
  for (var k in vCenterServersArray) {
     if (vCenterServersArray[k] === defaultVCenter) {
        return true;
     }
  }
  return false;
}

function toObject(arr) {
  var rv = {};
  for (var i = 0; i < arr.length; ++i)
    rv[i] = arr[i];
  return rv;
}