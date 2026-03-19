/**
 * Updates the license key for vSphere ESXi hosts.
 * Matches hosts returned from a UCS workflow service profile list against vCenter inventory.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {VC:SdkConnection} SDKConnection vCenter SDK connection.
 * @param {Array} UCSWF_SERVICE_PROFILES_RETURNED List of service profiles from UCS.
 * @param {string} DC_DOMAIN Datacenter domain suffix.
 * @param {string} license_key The license key to apply.
 * @returns {void}
 */

var host_obj = SDKConnection.allHostSystems;

for (var i in UCSWF_SERVICE_PROFILES_RETURNED) {
    var host_name = UCSWF_SERVICE_PROFILES_RETURNED[i].dn.replace('org-root/ls-', '') + '.' + DC_DOMAIN;
    host_name = host_name.toLowerCase();
    
    var targetHost = null;
    for each (var h in host_obj) {
        if (h.name == host_name) {
            targetHost = h;
            break;
        }
    }
    
    if (targetHost) {
        var id = targetHost.sdkId.split("/")[1];
        var host_id = targetHost.id;
        var name = targetHost.name;
        
        var license = SDKConnection.licenseManager.licenseAssignmentManager.queryAssignedLicenses(id);
        System.log("Current license for " + name + ": " + license);
        
        var update_license = SDKConnection.licenseManager.licenseAssignmentManager.updateAssignedLicense(host_id, license_key, name);
        if (update_license && update_license.name == "VMware vSphere 6 Enterprise Plus") {
            System.log("Host " + name + " has been licensed successfully");
        } else {
            System.log("Error while applying license to host " + name);
        }
    } else {
        System.warn("Host " + host_name + " not found in vCenter inventory.");
    }
}
