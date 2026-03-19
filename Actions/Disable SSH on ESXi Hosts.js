/**
 * @description Disables SSH (TSM-SSH service) on all ESXi hosts in a vCenter instance.
 *              Sets the SSH service policy to "off" and stops the service if it is currently
 *              running. Iterates over all hosts retrieved from the SDK connection.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {VC:SdkConnection} objVcSdkConnection - The vCenter SDK connection to retrieve hosts from.
 * @returns {void}
 */

var arrVcHostSystem = objVcSdkConnection.getAllHostSystems(null, null);

for (var i = 0; i < arrVcHostSystem.length; i++) {
    var objVcHostSystem = arrVcHostSystem[i];

    var objVcHostConfigManager = objVcHostSystem.configManager;

    var objVcHostServiceSystem = objVcHostConfigManager.serviceSystem;

    var objVcHostServiceInfo = objVcHostServiceSystem.serviceInfo;

    var arrVcHostService = objVcHostServiceInfo.service;

    for (var ii = 0; ii < arrVcHostService.length; ii++) {
        var objVcHostService = arrVcHostService[ii];

        if (objVcHostService.key == "TSM-SSH") {
            if (objVcHostService.policy != "off") {
                objVcHostServiceSystem.updateServicePolicy("TSM-SSH", "off");
            }

            if (objVcHostService.running == true) {
                objVcHostServiceSystem.stopService("TSM-SSH");
            }
        }
    }
}
