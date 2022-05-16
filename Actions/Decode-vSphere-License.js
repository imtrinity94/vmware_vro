/ Copyright 2016, VMware, Inc. All Rights Reserved
//
// VMware vRealize Orchestrator action sample
// 
// Decodes the 'Product Name' and 'Product Version' from a vSphere license string.
// Also does some basic license key format validation
//
//Action Inputs:
// vCenterConnection  -  VC:SdkConnection
// licenseKey         -  string
//
//Return type: void

//validate that we have a license key that is 5, 5 character strings delimited by a '-'
var licenseParts = licenseKey.split('-');
if (licenseParts.length != 5) {
    throw("license key is not complete");
}
for each (var part in licenseParts) {
    if (part.length < 5) {
        throw("license key is invalid.  Section: '"+part+"' of '"+licenseKey+"' is too short");
    }
    if (part.length > 5) {
        throw("license key is invalid.  Section: '"+part+"' of '"+licenseKey+"' is too long");
    }
}

var licenseInfo = vCenterConnection.licenseManager.decodeLicense(licenseKey);

System.log("License Name: "+licenseInfo.name);

var licenseProps = licenseInfo.properties;
for each (var licenseProp in licenseProps) {
    if (licenseProp.key === "ProductName") {
        System.log("Product Name: "+licenseProp.value);
    } else if (licenseProp.key === "ProductVersion") {
        System.log("Product Version: "+licenseProp.value);
    }
}
