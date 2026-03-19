/**
 * Updates the license key for vSphere ESXi hosts.
 * Matches hosts returned from a UCS workflow service profile list against vCenter inventory.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {VC:SdkConnection} vcSdkConnectionHandle - vCenter SDK connection.
 * @param {Any[]} ucsServiceProfilesList - List of service profiles objects from UCS.
 * @param {string} dnsDomainSuffix - Datacenter domain suffix.
 * @param {string} targetLicenseKey - The license key to apply.
 * @returns {void}
 */

var allInventoryHostsList = vcSdkConnectionHandle.allHostSystems;

System.log("Evaluating license assignment for " + (ucsServiceProfilesList ? ucsServiceProfilesList.length : 0) + " UCS service profiles.");

var i;
for (i = 0; i < ucsServiceProfilesList.length; i++) {
    var serviceProfileObj = ucsServiceProfilesList[i];
    
    // Construct FQDN from UCS DN: 'org-root/ls-HOST' -> 'HOST.DOMAIN'
    var hostShortName = serviceProfileObj.dn.replace('org-root/ls-', '');
    var calculatedFqdn = (hostShortName + "." + dnsDomainSuffix).toLowerCase();
    
    System.log("Resolving vCenter host object for FQDN: " + calculatedFqdn);
    
    var matchedHostSystem = null;
    var j;
    for (j = 0; j < allInventoryHostsList.length; j++) {
        var candidateHost = allInventoryHostsList[j];
        if (candidateHost.name.toLowerCase() === calculatedFqdn) {
            matchedHostSystem = candidateHost;
            break;
        }
    }
    
    if (matchedHostSystem) {
        var sdkIdentifierStr = matchedHostSystem.sdkId.split("/")[1];
        var hostInternalId = matchedHostSystem.id;
        var hostDisplayName = matchedHostSystem.name;
        
        System.log("Matched vCenter Host: " + hostDisplayName + " [SDK ID: " + sdkIdentifierStr + "]");
        
        var assignmentManager = vcSdkConnectionHandle.licenseManager.licenseAssignmentManager;
        
        // Audit current license status
        var currentAssignmentsList = assignmentManager.queryAssignedLicenses(sdkIdentifierStr);
        System.log("Current License State for " + hostDisplayName + ": " + (currentAssignmentsList ? JSON.stringify(currentAssignmentsList) : "Unlicensed"));
        
        // Submit license update
        System.log("Assigning new license key to " + hostDisplayName);
        var updateResult = assignmentManager.updateAssignedLicense(hostInternalId, targetLicenseKey, hostDisplayName);
        
        if (updateResult && updateResult.name && updateResult.name.indexOf("vSphere") !== -1) {
            System.log("Licensing SUCCESS for " + hostDisplayName + " [Assigned: " + updateResult.name + "]");
        } else {
            System.error("Licensing FAILURE for " + hostDisplayName + ". Verification returned null or unexpected product name.");
        }
    } else {
        System.warn("License update aborted: Host " + calculatedFqdn + " was not found in vCenter inventory.");
    }
}

System.log("Host licensing cycle finalized.");

return null;
