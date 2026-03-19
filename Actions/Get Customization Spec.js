/**
 * @description Retrieves a named customization spec from a vCenter SDK connection and logs
 *              the resolved spec name as a warning for verification.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {VC:SdkConnection} sdkConnection - The vCenter SDK connection.
 * @param {string} customizationSpecName - The name of the customization spec to retrieve.
 * @returns {void}
 */

// input Vc:SDkConnection
customizationSpecManager = sdkConnection.customizationSpecManager;
System.warn("customizationSpecManager found : " + customizationSpecManager);

customizationSpec = customizationSpecManager.getCustomizationSpec(customizationSpecName);
customSpecInfo = customizationSpec.info;
customSpecName = customSpecInfo.name;
System.warn("customSpecName found to use : " + customSpecName);
