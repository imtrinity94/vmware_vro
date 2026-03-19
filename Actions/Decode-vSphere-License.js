/**
 * @description Decodes the 'Product Name' and 'Product Version' from a vSphere license key
 *              by validating the key format and querying the vCenter license manager.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {VC:SdkConnection} vCenterConnection - The vCenter SDK connection.
 * @param {string} licenseKey - The vSphere license key string to decode.
 * @returns {void}
 */

// Validate that we have a license key that is 5, 5-character strings delimited by a '-'
var licenseParts = licenseKey.split('-');
if (licenseParts.length != 5) {
    throw ("license key is not complete");
}
for each(var part in licenseParts) {
    if (part.length < 5) {
        throw ("license key is invalid.  Section: '" + part + "' of '" + licenseKey + "' is too short");
    }
    if (part.length > 5) {
        throw ("license key is invalid.  Section: '" + part + "' of '" + licenseKey + "' is too long");
    }
}

var licenseInfo = vCenterConnection.licenseManager.decodeLicense(licenseKey);

System.log("License Name: " + licenseInfo.name);

var licenseProps = licenseInfo.properties;
for each(var licenseProp in licenseProps) {
    if (licenseProp.key === "ProductName") {
        System.log("Product Name: " + licenseProp.value);
    } else if (licenseProp.key === "ProductVersion") {
        System.log("Product Version: " + licenseProp.value);
    }
}
