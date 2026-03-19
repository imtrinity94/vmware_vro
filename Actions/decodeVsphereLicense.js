/**
 * @description Decodes the 'Product Name' and 'Product Version' from a vSphere license key
 *              by validating the key format and querying the vCenter license manager.
 * @note JSDoc generated via Antigravity AI IDE and can be reasonably incorrect.
 *
 * @param {VC:SdkConnection} sdkConnection - The vCenter SDK connection.
 * @param {string} licenseKeyStr - The vSphere license key string to decode.
 * @returns {void}
 */

// Validate that we have a license key that is 5 chunks of 5 characters delimited by a '-'
var keyParts = licenseKeyStr.split('-');
if (keyParts.length != 5) {
    throw "License key is incomplete or improperly formatted.";
}

var i;
for (i = 0; i < keyParts.length; i++) {
    var chunk = keyParts[i];
    if (chunk.length !== 5) {
        throw "License key chunk '" + chunk + "' is invalid (length must be 5).";
    }
}

var decodedLicense = sdkConnection.licenseManager.decodeLicense(licenseKeyStr);

System.log("License Display Name: " + decodedLicense.name);

var propertiesList = decodedLicense.properties;
var j;
for (j = 0; j < propertiesList.length; j++) {
    var prop = propertiesList[j];
    if (prop.key === "ProductName") {
        System.log("Product Name: " + prop.value);
    } else if (prop.key === "ProductVersion") {
        System.log("Product Version: " + prop.value);
    }
}

return null;
