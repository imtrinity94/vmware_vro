/**
 * Retrieve addresses of Update Manager servers
 *
 * @param {Array/string} userSelectedVcenters
 * @param {string} defaultVcenter
 * @return {Array/string} vCenterWithVumToBeRemoved
 * @return {Array/string} alreadyConfiguredVumVcenter
 * @return {Array/string} newVcentersWithVum
 * @return {Array/string} alreadyConfiguredAndNotRemovedVcentersWithVum
 * @return {Array/Properties} importCertificatesParameters
 * @return {string} vumVcenterTable
 */

// table with available VUM servers that are associated with the registered vCenter servers
var vumVcenterTable = {} ;

// get the vCenter servers that are already configured
var alreadyConfiguredVumVcenter =  System.getModule("com.vmware.library.vmware_update_manager").getRegisteredVcentersInVumPluginConfiguration();

var vCenterWithVumToBeRemoved = subtractArrays(alreadyConfiguredVumVcenter, userSelectedVcenters);
var newVcentersWithVum = subtractArrays(userSelectedVcenters, alreadyConfiguredVumVcenter);

// To retrieve the VCenter servers with Vum which are already configured and not deleted in current user configuration
// activity subtract the entities removed by configuration executed by the user from already stored configured entities.
// This set is need to check is default server is among newly added configuration or already existing configs which are not removed
var alreadyConfiguredAndNotRemovedVcentersWithVum = subtractArrays(alreadyConfiguredVumVcenter, vCenterWithVumToBeRemoved);

/** 
 Note: 
It is possible some vCenters with VUM server configurations might not be changed in the current workflow in case where
these servers are registered into a VMware Aria Automation Orchestrator configuration with "session per user authentication" and
the current user might not have access to these vCenter servers. If the server is removed during user interaction, then the vCenter
configuration will be removed without consideration of the ownership of the vCenter configuration - which is the user
who added the vCenter instance to the VMware Aria Automation Orchestrator configuration.
*/

// Retrieve the URLs of the newly added vCenter servers
for (var k in newVcentersWithVum) {
    try { 
         var vumUrl = VumObjectManager.getVumUri(newVcentersWithVum[k]);

         if (vumUrl)  {
             vumVcenterTable[vumUrl] = newVcentersWithVum[k];
         } else {
            System.error("The vCenter with URL " + newVcentersWithVum[k] + " doesn't have associated Update Manager server and will be excluded for further registration processing." );
         } 
     } catch (err) {
          System.error("Error while retrieving the URL address of Update Manager server associated with vCenter instance on URL: " +  newVcentersWithVum[k]  + " Error: " + err);
     }
}

var importCertificatePropArray = [];

 // Importing of Update Manager servers SSL certificates 
for (var vumUrl in vumVcenterTable) {
     var properties = new Properties();
     properties.put("url", vumUrl) ;
     properties.put('ignoreWarnings', true);
     importCertificatePropArray.push(properties);
}


importCertificatesParameters = importCertificatePropArray;

/**
   Util functions 
*/
function subtractArrays (a1, a2) {
  return a1.filter(function(x) { return a2.indexOf(x) < 0 })
};