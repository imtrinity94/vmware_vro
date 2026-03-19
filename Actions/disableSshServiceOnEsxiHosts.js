/**
 * @description Disables SSH (TSM-SSH service) on all ESXi hosts in a vCenter instance.
 *              Sets the SSH service policy to "off" and stops the service if it is currently
 *              running.
 * @note JSDoc generated via Antigravity AI IDE and can be reasonably incorrect.
 *
 * @param {VC:SdkConnection} sdkConnection - The vCenter SDK connection to retrieve hosts from.
 * @returns {void}
 */

var allHostSystemsList = sdkConnection.getAllHostSystems(null, null);

var i;
for (i = 0; i < allHostSystemsList.length; i++) {
    var hostSystemObj = allHostSystemsList[i];
    var serviceSystem = hostSystemObj.configManager.serviceSystem;
    var servicesArray = serviceSystem.serviceInfo.service;

    var j;
    for (j = 0; j < servicesArray.length; j++) {
        var serviceObj = servicesArray[j];

        if (serviceObj.key == "TSM-SSH") {
            if (serviceObj.policy != "off") {
                System.log("Updating SSH policy to 'off' on host: " + hostSystemObj.name);
                serviceSystem.updateServicePolicy("TSM-SSH", "off");
            }

            if (serviceObj.running == true) {
                System.log("Stopping SSH service on host: " + hostSystemObj.name);
                serviceSystem.stopService("TSM-SSH");
            }
        }
    }
}

return null;
