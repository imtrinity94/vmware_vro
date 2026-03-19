/**
 * @description Configures vCloud Director Organization Federation (SAML) settings by:
 *              1. Authenticating to the vCD API and retrieving an x-vcloud-authorization token.
 *              2. Submitting an OrgFederationSettings XML payload via REST PUT.
 *              3. Retrieving all Role references for the organization.
 *              4. Creating a SAML provider group linked to the "Defer to Identity Provider" role.
 * @note JSDoc generated via Antigravity AI IDE and can be reasonably incorrect.
 *
 * @param {string} targetSiteName - The identifier for the target datacenter site.
 * @param {string} DC1_NAME - The name constant for datacenter 1.
 * @param {string} DC2_NAME - The name constant for datacenter 2.
 * @param {REST:RESTHost} dc1VcloudRestHost - REST host for datacenter 1's vCD instance.
 * @param {REST:RESTHost} dc2VcloudRestHost - REST host for datacenter 2's vCD instance.
 * @param {string} vcdApiUsername - The vCD API username.
 * @param {string} vcdApiPassword - The vCD API password.
 * @param {string} organizationId - The vCD organization UUID.
 * @param {string} tenantDisplayName - The tenant/organization display name.
 * @param {string} samlMetadataXml - The SAML metadata XML fragment to embed in the federation settings.
 * @returns {void}
 */

System.log("Initiating Organization Federation configuration for: " + tenantDisplayName);

var vcdBaseUrl = "";
if (DC1_NAME === targetSiteName) {
    vcdBaseUrl = dc1VcloudRestHost.url.split(":443")[0];
} else if (DC2_NAME === targetSiteName) {
    vcdBaseUrl = dc2VcloudRestHost.url.split(":443")[0];
}

if (!vcdBaseUrl) {
    throw "Unable to determine vCloud Director API URL for site: " + targetSiteName;
}

var commonHeadersJson = '[{"key":"Accept","value":"application/*;version=27.0"}]';
var loginResponse = System.getModule("com.mayank").invokeRestOperationMultipleHeaders(vcdBaseUrl, vcdApiUsername, vcdApiPassword, "api/sessions", "POST", "", commonHeadersJson);

var vcloudAuthToken = "";
if (System.getModule("com.mayank").getHttpOperationStatus(loginResponse.statusCode)) {
    vcloudAuthToken = loginResponse.getHeaderValues('x-vcloud-authorization');
}

if (!vcloudAuthToken) {
    throw "Failed to retrieve vCloud authorization token. Session authentication failed.";
}

var federationHeadersJson = '[{"key":"Accept","value":"application/*;version=27.0"},{"key":"x-vcloud-authorization","value":"' + vcloudAuthToken + '"},{"key":"Content-Type","value":"application/vnd.vmware.admin.organizationFederationSettings+xml"}]';

var federationSettingsPayload = '<?xml version="1.0" encoding="UTF-8"?>' +
    '<OrgFederationSettings xmlns="http://www.vmware.com/vcloud/v1.5" href="' + vcdBaseUrl + 'api/admin/org/' + organizationId + '/settings/federation" type="application/vnd.vmware.admin.organizationFederationSettings+xml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.vmware.com/vcloud/v1.5 ' + vcdBaseUrl + 'api/v1.5/schema/master.xsd"> <Link rel="up" href="' + vcdBaseUrl + 'api/admin/org/' + organizationId + '/settings" type="application/vnd.vmware.admin.organization+xml"/> <Link rel="edit" href="' + vcdBaseUrl + 'api/admin/org/' + organizationId + '/settings/federation" type="application/vnd.vmware.admin.organizationFederationSettings+xml"/>' +
    '<Link rel="federation:regenerateFederationCertificate" href="' + vcdBaseUrl + 'api/admin/org/' + organizationId + '/settings/federation/action/regenerateFederationCertificate"/>' +
    samlMetadataXml +
    '<Enabled>true</Enabled> <SamlSPEntityId>' + tenantDisplayName + '-' + targetSiteName + '</SamlSPEntityId><RoleAttributeName>VCD_Role_Name</RoleAttributeName>' +
    '</OrgFederationSettings>';

if (!samlMetadataXml) {
    System.warn("Caution: samlMetadataXml is empty. Federation might not function correctly.");
}

var fedUpdatePath = "api/admin/org/" + organizationId + "/settings/federation";
System.log("Updating Federation Settings via PUT: " + fedUpdatePath);
var fedUpdateResponse = System.getModule("com.mayank").invokeRestOperationMultipleHeaders(vcdBaseUrl, vcdApiUsername, vcdApiPassword, fedUpdatePath, "PUT", federationSettingsPayload, federationHeadersJson);

// Retrieve and map Role References
var roleNameToIdMap = {};
var orgDetailsPath = "api/admin/org/" + organizationId;
var orgDetailsResponse = System.getModule("com.mayank").invokeRestOperationMultipleHeaders(vcdBaseUrl, vcdApiUsername, vcdApiPassword, orgDetailsPath, "GET", "", federationHeadersJson);

if (System.getModule("com.mayank").getHttpOperationStatus(orgDetailsResponse.statusCode)) {
    var orgDataJson = System.getModule("com.vmware.library.http-rest").xml2json(orgDetailsResponse.contentAsString);
    if (orgDataJson.AdminOrg && orgDataJson.AdminOrg.RoleReferences && orgDataJson.AdminOrg.RoleReferences.RoleReference) {
        var roleRefsList = orgDataJson.AdminOrg.RoleReferences.RoleReference;
        var i;
        for (i = 0; i < roleRefsList.length; i++) {
            var refObj = roleRefsList[i];
            var hrefParts = refObj.href.split('/');
            if (hrefParts.length > 0) {
                roleNameToIdMap[refObj.name] = hrefParts.pop();
            }
        }
    }
}

// Provision SAML Group mapping
var groupHeadersJson = '[{"key":"Accept","value":"application/*;version=27.0"},{"key":"x-vcloud-authorization","value":"' + vcloudAuthToken + '"},{"key":"Content-Type","value":"application/vnd.vmware.admin.group+xml"}]';
var groupCreationPath = 'api/admin/org/' + organizationId + '/groups';
var targetRoleName = "Defer to Identity Provider";

var groupPayloadXml = '<?xml version="1.0" encoding="UTF-8"?><Group xmlns="http://www.vmware.com/vcloud/v1.5" name="' + tenantDisplayName + '" type="application/vnd.vmware.admin.group+xml"><Description/><NameInSource>' + tenantDisplayName + '</NameInSource><UsersList/><ProviderType>SAML</ProviderType><Role href="' + vcdBaseUrl + 'api/admin/role/' + roleNameToIdMap[targetRoleName] + '" name="' + targetRoleName + '" type="application/vnd.vmware.admin.role+xml"/></Group>';

System.log("Creating/Mapping vCD Group for SAML: " + tenantDisplayName);
var groupResponse = System.getModule("com.mayank").invokeRestOperationMultipleHeaders(vcdBaseUrl, vcdApiUsername, vcdApiPassword, groupCreationPath, "POST", groupPayloadXml, groupHeadersJson);

if (System.getModule("com.mayank").getHttpOperationStatus(groupResponse.statusCode)) {
    System.log("Successfully provisioned SAML group and role mapping.");
} else {
    System.error("Failed to provision SAML group. Status: " + groupResponse.statusCode);
}

System.log("Organization Federation configuration completed.");

return null;
