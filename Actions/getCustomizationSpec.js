/**
 * @description Retrieves a named customization spec from a vCenter SDK connection and logs
 *              the resolved spec name as a warning for verification.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {VC:SdkConnection} sdkConnectionObj - The vCenter SDK connection.
 * @param {string} specNameString - The name of the customization spec to retrieve.
 * @returns {void}
 */

var customizationSpecMgr = sdkConnectionObj.customizationSpecManager;
if (!customizationSpecMgr) {
    throw "Customization Spec Manager not found for the provided SDK connection.";
}

System.debug("Attempting to retrieve customization spec: " + specNameString);

var customizationSpecObj = customizationSpecMgr.getCustomizationSpec(specNameString);
if (customizationSpecObj && customizationSpecObj.info) {
    var validatedName = customizationSpecObj.info.name;
    System.log("Resolved customization spec name: " + validatedName);
} else {
    System.warn("Customization spec '" + specNameString + "' was not found in vCenter.");
}

return null;
