// copied from github.com/pekaur/vro
var host_obj = SDKConnection.allHostSystems;
for (var i in UCSWF_SERVICE_PROFILES_RETURNED) {
    var host_name = UCSWF_SERVICE_PROFILES_RETURNED[i].dn.replace('org-root/ls-', '') + '.' + DC_DOMAIN;
    host_name = host_name.toLowerCase();
    for each(var i in host_obj) {
        if (i.name == host_name) {
            var id = i.sdkId;
            id = id.split("/")[1];
            var host_id = i.id;
            var name = i.name;
        }
    }
    var license = SDKConnection.licenseManager.licenseAssignmentManager.queryAssignedLicenses(id);
    System.log(license);
    var update_license = SDKConnection.licenseManager.licenseAssignmentManager.updateAssignedLicense(host_id, license_key, name)
    if (update_license.name == "VMware vSphere 6 Enterprise Plus")
        System.log("Host has been licensed successfully");
    else
        System.log("Error while applying license to the host");
}
